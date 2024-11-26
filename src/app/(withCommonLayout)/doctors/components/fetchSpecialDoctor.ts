export async function getDoctors(specialtiesParam: string) {
  try {
    const res = await fetch(
      `http://localhost:5000/api/v1/doctor?specialties=${specialtiesParam}`,
      { cache: "no-store" }
    );

    if (!res.ok) {
      throw new Error("Failed to fetch doctors");
    }

    const result = await res.json();
    return result.data || [];
  } catch (error) {
    console.error(error);
    return [];
  }
}
