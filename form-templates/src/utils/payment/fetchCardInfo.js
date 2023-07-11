const _fetchCardInfo = () => {
  const CACHE = {}
  return async (cardNum) => {
    cardNum = cardNum.replace(/\D/g, '').slice(0, 11)
    if (cardNum < 6) return null
    if (CACHE[cardNum]) {
      return CACHE[cardNum]
    }
    const banks = await fetch('./banks/paymentData.json')
      .then((res) => res.json())
      .then((data) => data.banks)
    for (const bank of banks) {
      for (const bin of bank.bins || []) {
        if (cardNum.startsWith(bin)) {
          const bankData = { logo: bank.schema, colors: bank.color }
          CACHE[cardNum] = bankData
          return bankData
        }
      }
    }
    return null
  }
}
// 6 <= bin <= 11
// ../../../public/

export const fetchCardInfo = _fetchCardInfo()
