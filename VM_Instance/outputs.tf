output "vm_external_ip" {
  description = "Public IP address of the GCP VM"
  value       = google_compute_address.vm_static_ip.address
}
