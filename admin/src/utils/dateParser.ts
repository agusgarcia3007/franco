export function dateParser(timestamp: string): string {
  const inputDate = new Date(timestamp);
  const currentDate = new Date();

  // Validar fecha.
  if (isNaN(inputDate.getTime())) {
    throw new Error("Timestamp no válido");
  }

  const diffInMilliseconds = currentDate.getTime() - inputDate.getTime();
  const diffInHours = diffInMilliseconds / (1000 * 60 * 60);
  const diffInDays = diffInMilliseconds / (1000 * 60 * 60 * 24);

  if (diffInHours < 1) {
    return "hace menos de una hora";
  }

  if (diffInHours < 24) {
    return `hace ${Math.round(diffInHours)} ${
      Math.round(diffInHours) === 1 ? "hora" : "horas"
    }`;
  }

  if (diffInDays < 7) {
    return `hace ${Math.round(diffInDays)} ${
      Math.round(diffInDays) === 1 ? "día" : "días"
    }`;
  }

  const day = inputDate.getDate();
  const month = inputDate.getMonth() + 1; // Los meses son base 0 en JavaScript.
  const year = inputDate.getFullYear();
  return `${day}/${month}/${year}`;
}
