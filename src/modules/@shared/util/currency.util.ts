export class CurrencyUtil {
  public static format(value: number, localce = "pt-BR", currency = "BRL") {
    return value.toLocaleString(localce, { style: "currency", currency });
  }
}
