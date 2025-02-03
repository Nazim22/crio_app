output "vpc_name" {
  value = google_compute_network.vpc_network.name
}

output "subnet_name" {
  value = google_compute_subnetwork.subnet_gke.name
}

output "gke_cluster_name" {
  value = google_container_cluster.gke_cluster.name
}

output "gke_cluster_endpoint" {
  value = google_container_cluster.gke_cluster.endpoint
}
