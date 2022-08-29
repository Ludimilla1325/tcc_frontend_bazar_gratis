const CURRENCY_FORMATTER = new Intl.NumberFormat(undefined, {
  currency: "BRL",
  style: "currency",
});

export function formatarDinheiro(number: number) {
  return CURRENCY_FORMATTER.format(number);
}
