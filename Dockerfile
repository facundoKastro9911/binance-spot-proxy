# Usa una imagen oficial y ligera de Node.js
FROM node:18-alpine

# Define el directorio de trabajo
WORKDIR /app

# Copia package.json y package-lock.json (si existe)
COPY package*.json ./

# Instala solo las dependencias necesarias
RUN npm install --production

# Copia el resto del código fuente
COPY . .

# Expone el puerto que usa la app
EXPOSE 3000

# Comando de inicio
CMD ["npm", "start"]
