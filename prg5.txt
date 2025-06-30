Absolutely, Anu! Below is a **clear, step-by-step guide** and a **lab write-up** for **Program No-5: Basic Infrastructure Deployment using Terraform** that you can refer to **during your exam**. This will help you **provision an EC2 instance**, **create an S3 bucket**, and even **deploy a scalable web server**, all using Terraform.

---

## ✅ **LAB TITLE**

**Program No-5: Basic Infrastructure Deployment using Terraform (IaC)**

---

## ✅ **AIM**

To write Terraform configuration files to provision:

1. A single EC2 instance on AWS
2. An S3 bucket and upload a file to it
3. A scalable web server on AWS
   using Terraform commands:
   `terraform init`, `terraform plan`, `terraform apply`, and `terraform destroy`.

---

## ✅ **TOOL USED**

Terraform (IaC Tool)
AWS CLI
AWS Cloud Platform

---

## ✅ **CONCEPT EXPLAINED: INFRASTRUCTURE AS CODE (IaC)**

Before IaC, system admins had to manually set up infrastructure like servers, databases, networks, etc., leading to:

* Inconsistencies
* No version control
* Tedious documentation
* Slow provisioning

**IaC** automates this by defining infrastructure in **code (like Python or Terraform)**, making it:

* Fast
* Consistent
* Reproducible
* Version-controllable

**Popular IaC tools**: Terraform, AWS CloudFormation, Ansible, Chef.

---

## ✅ **WHY TERRAFORM?**

* Works with **multiple cloud providers** (AWS, Azure, GCP).
* **Declarative syntax** (you describe what you want).
* Maintains a **state file** to know what is deployed.
* Allows **previewing with `plan`**, safe deployment with `apply`.
* Written in **HCL (HashiCorp Configuration Language)** – simple and human-readable.
* Large **community & modules** available.

---

## ✅ **KEY TERMS TO KNOW**

| Term           | Description                                           |
| -------------- | ----------------------------------------------------- |
| **Provider**   | Cloud service (like AWS, GCP)                         |
| **Resource**   | Infra you want to create (EC2, S3)                    |
| **Module**     | Reusable Terraform code                               |
| **Variable**   | Input to your code                                    |
| **Output**     | Information printed post-deployment                   |
| **State File** | Tracks real-time status of infra                      |
| **Plan**       | Shows what will be created/changed                    |
| **Apply**      | Executes the plan                                     |
| **Destroy**    | Destroys infra to avoid billing                       |
| **Workspace**  | Used to manage multiple environments (dev/stage/prod) |

---

## ✅ **PART A: INSTALLATION**

### 1. **Install Terraform on Windows**

* Download from: [https://terraform.io/downloads](https://terraform.io/downloads)
* Unzip it to `C:\Program Files\Terraform`
* Add the folder path to **System Environment Variables > PATH**
* Open CMD:

```bash
terraform -version
```

### 2. **Install AWS CLI**

* Download: [https://aws.amazon.com/cli/](https://aws.amazon.com/cli/)
* After install:

```bash
aws --version
```

### 3. **Configure AWS CLI**

```bash
aws configure
```

* You’ll need:

  * **Access Key ID**
  * **Secret Access Key**
  * Region (e.g., `us-west-2`)
  * Output format: `json`

> ⚠️ Get your AWS access keys via **IAM** → Create User → Programmatic access → Attach `AmazonEC2FullAccess`.

---

## ✅ **PART B: SINGLE EC2 INSTANCE**

### ✅ **1. Create Project Directory**

```bash
mkdir terraform_ec2 && cd terraform_ec2
```

### ✅ **2. Create `main.tf`**

```hcl
provider "aws" {
  region = "us-west-2"
}

resource "aws_instance" "ec2_machine" {
  ami           = "ami-07b0c09aab6e66ee9"
  instance_type = "t2.micro"
  tags = {
    Name = "Terra EC2"
  }
}
```

### ✅ **3. Commands**

```bash
terraform init       # Initialize
terraform plan       # See changes
terraform apply      # Deploy (type 'yes')
```

### ✅ **4. Verify**

Go to AWS Console → EC2 → Instances → check if it's running.

### ✅ **5. Destroy**

```bash
terraform destroy    # Avoid billing
```

---

## ✅ **PART C: CREATE S3 BUCKET AND UPLOAD FILE**

### ✅ **1. Prepare `sample1.txt`**

```bash
echo "Hellow..welcome to terraform." > sample1.txt
```

### ✅ **2. `main.tf`**

```hcl
provider "aws" {
  region = "us-west-2"
}

resource "aws_instance" "ec2_machine" {
  ami           = "ami-07b0c09aab6e66ee9"
  instance_type = "t2.micro"
  count         = 4
  tags = {
    Name = "Terra EC2"
  }
}

resource "aws_s3_bucket" "demo_bucket" {
  bucket = "my-unique-s3-bucket-2025-upload-anu"  # MUST be globally unique!
  tags = {
    Name = "upload-demo"
  }
}

resource "aws_s3_bucket_object" "text_file" {
  bucket = aws_s3_bucket.demo_bucket.bucket
  key    = "sample1.txt"
  source = "./sample1.txt"
}
```

### ✅ **3. Run Commands**

```bash
terraform init
terraform apply   # type 'yes'
```

### ✅ **4. Verify**

Go to AWS Console → S3 → Find your bucket → check for `sample1.txt`.

---

## ✅ **PART D: SCALABLE WEB SERVER (HTTP)**

### ✅ **1. `main.tf`**

```hcl
provider "aws" {
  region = "us-west-2"
}

resource "aws_security_group" "web_sg" {
  name        = "web_sg"
  description = "Allow HTTP inbound traffic"

  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

resource "aws_instance" "web_server" {
  ami           = "ami-07b0c09aab6e66ee9"
  instance_type = "t2.micro"
  security_groups = [aws_security_group.web_sg.name]

  user_data = <<-EOF
    #!/bin/bash
    yum update -y
    yum install -y httpd
    systemctl start httpd
    systemctl enable httpd
    echo "<h1>Deployed via Terraform</h1>" > /var/www/html/index.html
  EOF

  tags = {
    Name = "TerraformWebServer"
  }
}
```

### ✅ **2. Run**

```bash
terraform init
terraform apply
```

### ✅ **3. Test**

* Go to AWS EC2 console → copy the public IP.
* Open in browser: `http://<public-ip>` → Should display:
  **“Deployed via Terraform”**

---

## ✅ **WHAT TO WRITE IN LAB WRITE-UP**

### **Aim**:

To deploy AWS infrastructure using Terraform including EC2 instance, S3 bucket, and a web server.

### **Tools Used**:

* Terraform
* AWS CLI
* AWS Cloud Console

### **Code Summary**:

1. Defined AWS Provider
2. Created EC2 Instance
3. Created S3 Bucket and uploaded a file
4. Created Web Server with Apache installed via `user_data`

### **Commands Used**:

* `terraform init` – Initialize Terraform
* `terraform plan` – Preview infrastructure
* `terraform apply` – Deploy infrastructure
* `terraform destroy` – Remove infrastructure

### **Output**:

* EC2 Instance visible in AWS Console
* File uploaded to S3
* Apache web page displayed on public IP

### **Conclusion**:

Terraform simplifies infrastructure provisioning with code. It is cloud-agnostic and uses a declarative HCL syntax. With just a few lines of configuration, powerful infrastructure can be created, updated, or destroyed efficiently.

---

Let me know if you'd like this as a printable `.docx` or `.pdf`, or if you want screenshots or terminal commands too!
