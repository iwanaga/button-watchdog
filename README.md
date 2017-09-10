# button-watchdog
store multiple button push events

# Server Setup
## nvm インストール
https://github.com/creationix/nvm を参照

## MongoDB インストール
https://docs.mongodb.com/manual/installation/ を参照

## daemon化ツール
```bash
npm install -g forever
sudo cp button-watchdog /etc/init.d/
sudo chmod a+x /etc/init.d/button-watchdog
sudo update-rc.d button-watchdog defaults
sudo chkconfig --add button-watchdog
```

## デバイス側プロセス起動
```bash
sudo service button-watchdog start
```

起動確認
```bash
sudo /home/pi/.nvm/versions/node/v6.11.2/bin/forever list
```

ログ確認
```bash
sudo /home/pi/.nvm/versions/node/v6.11.2/bin/forever logs index.js
```

## 開発環境のみ
```bash
npm install -g yo gulp-cli generator-angular-fullstack
```

## デプロイ
```bash
git clone https://github.com/iwanaga/button-watchdog.git
cd button-watchdog/app/

npm install
gulp build:dist
```

## 起動
```bash
gulp serve:dist
node dist/server
```
