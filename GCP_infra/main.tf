terraform {
  required_providers {
    google = {
      source  = "hashicorp/google"
      version = "~> 4.0"
    }
  }
}

provider "google" {
  project = var.project_id
  region  = var.region
}

# ✅ Create VPC
resource "google_compute_network" "vpc_network" {
  name                    = var.vpc_name
  auto_create_subnetworks = false
}

# ✅ Create Subnet
resource "google_compute_subnetwork" "subnet_gke" {
  name          = "subnet-gke"
  region        = var.region
  network       = google_compute_network.vpc_network.id
  ip_cidr_range = "10.0.1.0/24"
}

# ✅ Create Firewall Rule for HTTP and Kubernetes
resource "google_compute_firewall" "allow_http" {
  name    = "allow-http"
  network = google_compute_network.vpc_network.name

  allow {
    protocol = "tcp"
    ports    = ["80", "443", "8080"]
  }

  source_ranges = ["0.0.0.0/0"]
}

# ✅ Create GKE Cluster (WITHOUT Default Node Pool)
resource "google_container_cluster" "gke_cluster" {
  name     = var.gke_cluster_name
  location = var.region
  network  = google_compute_network.vpc_network.id
  subnetwork = google_compute_subnetwork.subnet_gke.id

  remove_default_node_pool = true  # ❌ Remove default node pool
  initial_node_count       = 1      # Required, but overridden

  lifecycle {
    ignore_changes = [initial_node_count]  # Prevent Terraform from managing default node count
  }
}

# ✅ Create a Custom Node Pool with EXACTLY 2 Nodes
resource "google_container_node_pool" "gke_nodes" {
  name       = "custom-node-pool"
  cluster    = google_container_cluster.gke_cluster.id
  location   = var.region
  node_count = 2  # ✅ EXACTLY 2 NODES

  node_config {
    machine_type = "e2-medium"
    disk_size_gb = 30
    oauth_scopes = ["https://www.googleapis.com/auth/cloud-platform"]
  }
}
