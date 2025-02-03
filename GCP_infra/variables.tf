variable "project_id" {
  description = "GCP Project ID"
  type        = string
}

variable "region" {
  description = "GCP region"
  type        = string
  default     = "us-central1"
}

variable "vpc_name" {
  description = "VPC Name"
  type        = string
  default     = "my-vpc"
}

variable "gke_cluster_name" {
  description = "GKE Cluster Name"
  type        = string
  default     = "my-gke-cluster"
}
