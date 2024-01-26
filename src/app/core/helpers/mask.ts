export default function formatCEP(cep: string): string {
  const cleanedCEP = cep.replace(/[^\d]/g, "");
  const formattedCEP = cleanedCEP.replace(/^(\d{5})(\d{3})$/, "$1-$2");

  return formattedCEP;
}
