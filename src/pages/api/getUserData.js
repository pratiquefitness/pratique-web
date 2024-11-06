// pages/api/getUserData.js
import { apiPratiqueFunciona } from "@/services";

export default async function handler(req, res) {
  const { userId } = req.query;

  if (!userId) {
    return res.status(400).json({ error: "User ID is required" });
  }

  try {
    const user = await apiPratiqueFunciona.wp_users.findUnique({
      where: { ID: parseInt(userId) }
    });

    if (!user) {
      console.error(`User with ID ${userId} not found`);
      return res.status(404).json({ error: "User not found" });
    }

    console.log("User found:", user); // Adicionando log para verificar os dados do usuário

    const funcionarioExists = await apiPratiqueFunciona.funcionarios.findMany({
      where: {
        email: user.user_email
      }
    });

    console.log("Funcionario exists:", funcionarioExists); // Adicionando log para verificar os dados do funcionário

    user.isEmployee = funcionarioExists.length ? 1 : 0;
    user.cargo = funcionarioExists.length ? funcionarioExists[0].cargo : 0;

    // Convert BigInt to string
    const userWithStringifiedBigInt = {
      ...user,
      ID: user.ID.toString()
    };

    res.status(200).json(userWithStringifiedBigInt);
  } catch (error) {
    console.error("Error fetching user data:", error);
    res.status(500).json({ error: "Error fetching user data", details: error.message });
  }
}
