provider "google" {
  project = var.project_id
  region  = var.region
}

# Create a Static IP Address
resource "google_compute_address" "vm_static_ip" {
  name   = "vm-static-ip"
  region = var.region
}

# Create the GCP VM
resource "google_compute_instance" "gcp_vm" {
  name         = "gcp-vm-instance"
  machine_type = "e2-standard-4"
  zone         = var.zone

  boot_disk {
    initialize_params {
      image = "ubuntu-2204-lts"
      size  = 50
      type  = "pd-ssd"
    }
  }

  network_interface {
    network = "default"
    access_config {
      nat_ip = google_compute_address.vm_static_ip.address
    }
  }

  # Attach a startup script to install SonarQube and Trivy
  metadata_startup_script = file("startup-script.sh")

  tags = ["http-server", "https-server", "sonarqube"]
}

# Firewall Rule to Allow HTTP, HTTPS, SSH & SonarQube
resource "google_compute_firewall" "allow_http_https_ssh" {
  name    = "allow-http-https-ssh-sonarqube"
  network = "default"

  allow {
    protocol = "tcp"
    ports    = ["22", "80", "443", "9000"]
  }

  source_ranges = ["0.0.0.0/0"]
  target_tags   = ["http-server", "https-server", "sonarqube"]
}
