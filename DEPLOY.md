# 会员体系竞品监控网站部署说明

## 运行方式

这个版本不是纯静态站。它包含：

- `server.js`：Node HTTP 服务，托管前端和 API。
- `data/live-data.json`：服务运行后保存正式动态和待审核队列。
- `data/source-watchlist.json`：每日监控源配置。
- `update-engine.js`：每日抓取、变更检测、候选动态生成、审核发布逻辑。

## 本地运行

```powershell
npm start
```

打开：

```text
http://localhost:8080
```

手动触发一次更新：

```powershell
Invoke-RestMethod -Method Post http://localhost:8080/api/update
```

## Linux 服务器部署

假设部署目录：

```text
/opt/membership-monitor
```

启动命令：

```bash
cd /opt/membership-monitor
npm start
```

服务默认监听：

```text
0.0.0.0:8080
```

可用环境变量：

```bash
PORT=8080
UPDATE_HOUR=9
```

`UPDATE_HOUR=9` 表示每天北京时间 9 点自动执行一次监控更新。

## systemd 示例

保存为：

```text
/etc/systemd/system/membership-monitor.service
```

```ini
[Unit]
Description=Membership Monitor
After=network.target

[Service]
Type=simple
WorkingDirectory=/opt/membership-monitor
Environment=PORT=8080
Environment=UPDATE_HOUR=9
ExecStart=/usr/bin/node /opt/membership-monitor/server.js
Restart=always
RestartSec=5

[Install]
WantedBy=multi-user.target
```

启用：

```bash
sudo systemctl daemon-reload
sudo systemctl enable membership-monitor
sudo systemctl restart membership-monitor
sudo systemctl status membership-monitor
```

## Nginx 反向代理示例

```nginx
server {
    listen 80;
    server_name your-domain.example;

    location / {
        proxy_pass http://127.0.0.1:8080;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

配置 HTTPS 可使用服务器上的证书工具，例如 certbot。
