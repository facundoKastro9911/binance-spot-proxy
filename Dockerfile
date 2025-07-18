# Usa una imagen oficial de Node.js
FROM node:18

# Directorio de trabajo
WORKDIR /app

# Copia package.json y package-lock.json
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia el resto del código
COPY . .

# Expone el puerto que usa la app
EXPOSE 3000

# Comando para arrancar
CMD [ "node", "index.js" ]
