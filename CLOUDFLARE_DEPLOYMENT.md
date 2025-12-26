
# Cloudflare Pages 部署指南 / Cloudflare Pages Deployment Guide

本指南将帮助您将 BentoPDF 部署到 Cloudflare Pages。

This guide will help you deploy BentoPDF to Cloudflare Pages.

---

## 📋 前置要求 / Prerequisites

- Cloudflare 账号 / Cloudflare account
- GitHub 账号（用于连接仓库）/ GitHub account (for repository connection)
- Node.js 18+ （本地构建时需要）/ Node.js 18+ (for local builds)

---

## 🚀 方法一：通过 Cloudflare Pages Dashboard 部署（推荐）

### Method 1: Deploy via Cloudflare Pages Dashboard (Recommended)

1. **Fork 或克隆仓库 / Fork or Clone the Repository**
   ```bash
   git clone https://github.com/alam00000/bentopdf.git
   cd bentopdf
   ```

2. **推送到你的 GitHub 仓库 / Push to Your GitHub Repository**
   ```bash
   git remote add origin YOUR_GITHUB_REPO_URL
   git push -u origin main
   ```

3. **登录 Cloudflare Dashboard**
   - 访问 [Cloudflare Pages](https://dash.cloudflare.com/pages)
   - 点击 "Create a project" / "创建项目"

4. **连接 GitHub 仓库 / Connect GitHub Repository**
   - 选择 "Connect to Git"
   - 授权 Cloudflare 访问你的 GitHub
   - 选择 BentoPDF 仓库

5. **配置构建设置 / Configure Build Settings**
   ```
   项目名称 / Project name: bentopdf (或你喜欢的名称)
   生产分支 / Production branch: main
   
   构建设置 / Build settings:
   - Framework preset: Vite
   - Build command: npm run build
   - Build output directory: dist
   - Root directory: (留空 / leave empty)
   
   环境变量 / Environment variables (可选 / optional):
   - NODE_VERSION: 18
   ```

6. **保存并部署 / Save and Deploy**
   - 点击 "Save and Deploy"
   - Cloudflare 将自动构建并部署你的应用
   - 部署完成后，你会获得一个 `*.pages.dev` 域名

7. **配置自定义域名（可选）/ Configure Custom Domain (Optional)**
   - 在项目设置中，点击 "Custom domains"
   - 添加你的自定义域名并按照指示配置 DNS

---

## 🔧 方法二：使用 Wrangler CLI 部署

### Method 2: Deploy Using Wrangler CLI

⚠️ **重要提示 / Important Note**: 如果你在 macOS ARM64 (Apple Silicon) 上遇到 `@cloudflare/workerd-darwin-arm64` 错误，请使用下面的"方法 A"或直接使用"方法一"通过 Dashboard 部署。

### 方法 A：使用 npx（推荐，无需全局安装）

**Method A: Using npx (Recommended, no global installation needed)**

1. **构建项目 / Build the Project**
   ```bash
   npm install
   npm run build
   ```

2. **登录 Cloudflare / Login to Cloudflare**
   ```bash
   npx wrangler login
   ```

3. **部署到 Cloudflare Pages / Deploy to Cloudflare Pages**
   ```bash
   npx wrangler pages deploy dist --project-name=bentopdf
   ```

4. **后续更新 / Subsequent Updates**
   ```bash
   npm run build
   npx wrangler pages deploy dist --project-name=bentopdf
   ```

### 方法 B：全局安装 Wrangler（如果遇到问题需修复）

**Method B: Global Wrangler Installation (fix if encountering issues)**

1. **卸载旧版本 / Uninstall old version**
   ```bash
   npm uninstall -g wrangler
   ```

2. **重新安装（不跳过可选依赖）/ Reinstall (without skipping optional dependencies)**
   ```bash
   npm install -g wrangler --force
   ```

3. **如果仍然失败，使用项目本地安装 / If still failing, use local installation**
   ```bash
   # 在项目目录中
   npm install -D wrangler
   
   # 使用项目本地的 wrangler
   npx wrangler login
   npx wrangler pages deploy dist --project-name=bentopdf
   ```

### macOS ARM64 特定问题修复 / macOS ARM64 Specific Fix

如果在 Apple Silicon Mac 上遇到问题：

If encountering issues on Apple Silicon Mac:

```bash
# 清除 npm 缓存
npm cache clean --force

# 使用 npx 直接运行（推荐）
npx wrangler@latest login

# 或者安装到项目依赖
cd /path/to/bentopdf
npm install -D wrangler
npx wrangler login
```

---

## ⚙️ 高级配置 / Advanced Configuration

### 环境变量 / Environment Variables

如果需要自定义配置，可以在 Cloudflare Pages 设置中添加环境变量：

You can add environment variables in Cloudflare Pages settings for custom configuration:

```bash
# 示例：部署到子目录 / Example: Deploy to subdirectory
BASE_URL=/tools/bentopdf/

# 简化模式（隐藏品牌信息）/ Simple mode (hide branding)
SIMPLE_MODE=true
```

在 Cloudflare Pages Dashboard 中设置环境变量：
1. 进入项目设置 / Go to project settings
2. 点击 "Environment variables"
3. 添加变量并重新部署 / Add variables and redeploy

### 自定义构建命令 / Custom Build Command

如果使用环境变量，更新构建命令：

If using environment variables, update the build command:

```bash
# 在 Cloudflare Pages 构建设置中 / In Cloudflare Pages build settings:
BASE_URL=/tools/pdf/ npm run build
```

### 性能优化 / Performance Optimization

Cloudflare Pages 会自动：
- 在全球 CDN 上分发内容
- 启用 HTTP/2 和 HTTP/3
- 压缩静态资源
- 提供 SSL/TLS 加密

Cloudflare Pages automatically:
- Distributes content on global CDN
- Enables HTTP/2 and HTTP/3
- Compresses static assets
- Provides SSL/TLS encryption

---

## 📁 重要文件说明 / Important Files

### `wrangler.toml`
Wrangler CLI 配置文件，定义项目基本设置。

Wrangler CLI configuration file defining basic project settings.

### `public/_headers`
配置 HTTP 响应头，确保 WASM 和跨域资源正常工作。

Configures HTTP response headers to ensure WASM and CORS work properly.

### `public/_redirects`
处理 SPA 路由和语言重定向。

Handles SPA routing and language redirects.

---

## 🔒 安全特性 / Security Features

部署到 Cloudflare Pages 后，你的应用将自动获得：

After deploying to Cloudflare Pages, your app automatically gets:

- ✅ 免费 SSL/TLS 证书 / Free SSL/TLS certificates
- ✅ DDoS 防护 / DDoS protection
- ✅ 边缘缓存 / Edge caching
- ✅ 自动 HTTPS 重定向 / Automatic HTTPS redirect
- ✅ Web Application Firewall (WAF) 可选 / 