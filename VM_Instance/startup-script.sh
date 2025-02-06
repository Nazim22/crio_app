#!/bin/bash
set -e

# Update package lists and install dependencies
sudo apt update -y
sudo apt install -y docker.io unzip jq curl

# Start and enable Docker
sudo systemctl start docker
sudo systemctl enable docker

# Install SonarQube
echo "Installing SonarQube..."
docker run -d --name sonarqube \
  -p 9000:9000 \
  --restart always \
  sonarqube:lts

# Install Trivy
echo "Installing Trivy..."
docker pull aquasec/trivy:latest

# Open Firewall for HTTP, HTTPS, and SonarQube
sudo ufw allow 22/tcp
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw allow 9000/tcp
sudo ufw enable
