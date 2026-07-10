import geoip from 'geoip-country'

// const ip = '207.97.227.239' // '1.1.1.1' // '192.168.1.1' // '207.97.227.239'

const lookup = (ip) => {
  return new Promise((resolve, reject) => {
    const geo = geoip.lookup(ip)
    if (geo) {
      resolve(geo)
    } else {
      reject(('Can\'t lookup the IP'))
    }
  })
}

console.log(
  geoip // await lookup('207.97.2827.239')
)
