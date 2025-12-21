# Link Preview

A full-stack **infrastructure learning project** focused on modern AWS deployment workflows:
- PR-based preview environments
- Containerized backend
- Managed frontend hosting
- Infrastructure as code

This project is **not about product features**.  
It exists to understand **how real-world deployments work**.

## Goal

Learn and internalize the following concepts by building and deploying a real app:

- Monorepo workflows with **pnpm + Turborepo**
- Docker → ECR → ECS (Fargate) backend deployments
- Branch / PR-based preview environments
- CI/CD with GitHub Actions
- Frontend hosting with AWS Amplify
- AWS infrastructure using Terraform
- Redis & Postgres in a cloud environment

## What Is the App?

**Link Preview** is a small service similar to what Slack or Discord uses.

You give it a URL → it returns metadata:
- title
- description
- image

The same URL is cached for faster responses.

The app is intentionally simple so the focus stays on **deployment architecture**, not business logic.

### TODOs
- [x] Monorepo setup (pnpm + turborepo)
- [x] Frontend scaffold (Next.js)
  - [x] Add UI pages
- [x] Backend scaffold (NestJS)
  - [x] Add backend routes
- [x] Dockerize backend
- [ ] Push image to ECR
- [ ] Deploy backend to ECS Fargate
- [ ] Add CI/CD pipeline
- [ ] Enable PR preview environments
- [ ] Add Redis caching
- [ ] Add Postgres persistence

### PROGRESS
- Day 1: Setting up foundation
  - Setup Turborepo monorepo, Next.js for frontend & Nest.js for backend
- Day 2: Docker integrated
  - Basic endpoint added, with simple UI
  - Added Dockerfile for backend, ran the server from that image
- Day 3: Docker file on AWS
  - Setup Github Action to push the image to ECR
  - Setup AWS roles and policies
- Day 4: Backend running on ECS, with a twist
  - Made a cluster, task definition, and a service
  - Facing issues when adding Application Load Balancer.