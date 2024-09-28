# Usando uma imagem base do Node.js
FROM node:18-alpine

# Definindo o diretório de trabalho
WORKDIR /app

# Copiando os arquivos package.json e package-lock.json
COPY package*.json ./

# Instalando as dependências
RUN npm install

# Copiando o restante dos arquivos da aplicação
COPY . .

# Compilando TypeScript para JavaScript
RUN npm run build

# Expondo a porta usada pelo serviço
EXPOSE 3000

# Definindo o comando para rodar a aplicação
CMD ["npm", "run", "start"]