import $api from '../../http/api'
import ENDPOINTS from '../../http/endPoints'

const CACHE = {
  PS: {},
  B: {},
}

const _paymentSystems = {
  Visa: /^4/,
  MasterCard: /^5[1-5]/,
  Mir: /^220[0-4]/,
  Amex: /^3[47]/,
  Discover: /^6(?:011|5)/,
  JCB: /^(?:2131|1800|35)/,
  Diners: /^3(?:0[0-5]|[68])/,
  Maestro: /^(?:5[0678]|6304|6390|67)/,
  Unionpay: /^(62|88)/,
}

const _identifyPaymentSystem = async (cardNumber) => {
  let paymentSystem
  for (let ps in _paymentSystems) {
    if (_paymentSystems[ps].test(cardNumber)) {
      paymentSystem = ps
      break
    }
  }

  if (!paymentSystem) return null

  if (!CACHE.PS[paymentSystem]) {
    const fee = await $api.get(ENDPOINTS.getFee(cardNumber))
    CACHE.PS[paymentSystem] = { ...fee, logo: paymentSystem }
  }
  return CACHE.PS[paymentSystem]
}

const _identifyBank = async (cardNum) => {
  if (!CACHE.B[cardNum]) {
    CACHE.B[cardNum] = await fetch('./banks/paymentData.json')
      .then((res) => res.json())
      .then(({ banks }) => {
        for (const bank of banks) {
          for (const bin of bank.bins || []) {
            if (cardNum.startsWith(bin)) {
              return { logo: bank.schema, colors: bank.color }
            }
          }
        }
        return null
      })
  }
  return CACHE.B[cardNum]
}

const fetchCardInfo = async (cardNum) => {
  cardNum = cardNum.replace(/\D/g, '').slice(0, 11)
  if (cardNum.length < 6) return await _identifyPaymentSystem(cardNum)
  const [paymentSystem, bank] = await Promise.all([_identifyPaymentSystem(cardNum), _identifyBank(cardNum)])

  return {
    logo: bank?.logo || paymentSystem?.logo,
    colors: bank?.colors,
    fee: paymentSystem?.fee,
    min_fee: paymentSystem?.min_fee,
  }
}

export default fetchCardInfo
