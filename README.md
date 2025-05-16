# Where Buy

<div align="center">
<img height="400" src="https://raw.githubusercontent.com/LuizGustavoSena/WhereBuy/refs/heads/main/assets/WhereBuy.png" />
</div>
</br>
It's a API for create shopping items and render calculate list more cheap by supermarkets on your city.

## Table of Contents

- [Stack](#Stack)
- [Installation](#installation)
- [Usage](#usage)
- [API Documentation](#api-documentation)
- [Contributing](#contributing)
- [Contributor](#contributor)

---

## Stack
<div style="display: inline_block">
    <img height="40" width="50" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg" />
    <img height="40" width="50" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg" />
    <img height="40" width="50" src="https://raw.githubusercontent.com/LuizGustavoSena/WhereBuy/refs/heads/main/assets/express.png" />
    <img height="40" width="50" src="https://raw.githubusercontent.com/LuizGustavoSena/WhereBuy/refs/heads/main/assets/prisma.png" />
    <img height="40" width="50"src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg" />
    <img height="40" width="50" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vitest/vitest-original.svg" />
</div>

---

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/LuizGustavoSena/WhereBuy.git
   ```
2. Navigate to the project directory:
   ```bash
   cd WhereBuy
   ```
3. Install dependencies:
   ```bash
   npm install
   ```

---

## Usage

### Run the Development Server
```bash
npm run dev
```

### Build for Production
```bash
npm run build
```

### Run Tests
```bash
npm test
```

---

## API Documentation

### Shopping List
- Endpoint: `POST /v1/shopping-list`
  - Description: Create shopping item
  - Body parameters: `name: string; amount: number; typeAmount: 'unit' | 'grams' | 'liters';`
- Endpoint: `GET /v1/shopping-list`
  - Description: Get all shopping items or by name
  - Query param: `name: string;`
- Endpoint: `PATCH /v1/shopping-list/:id`
  - Description: Update shopping item by id
  - Body parameters: `name: string; amount: number; typeAmount: 'unit' | 'grams' | 'liters';`
- Endpoint: `DELETE /v1/shopping-list/:id`
  - Description: Delete shopping item by id
- Endpoint: `DELETE /v1/shopping-list`
  - Description: Delete all shopping items
### Render Buy List
- Endpoint: `GET /v1/render-buy-list`
  - Description: Render buy list

---

## Contributing

Contributions are welcome! Please follow these steps:
1. Fork the project.
2. Create a new branch:
   ```bash
   git checkout -b feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m 'Add a meaningful message'
   ```
4. Push the branch:
   ```bash
   git push origin feature-name
   ```
5. Submit a pull request.

## Contributor

<a href="https://github.com/LuizGustavoSena">
  <img height="60" width="60" style="border-radius: 50px" src="https://avatars.githubusercontent.com/u/69394005?v=4" alt="contrib.rocks image" />
</a>