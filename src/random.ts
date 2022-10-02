let m_w = 123456789;
let m_z = 987654321;
let mask = 0xffffffff;

export function seed(i: number) {
  m_w = (123456789 + i) & mask;
  m_z = (987654321 - i) & mask;
}

export function random() {
  m_z = (36969 * (m_z & 65535) + (m_z >> 16)) & mask;
  m_w = (18000 * (m_w & 65535) + (m_w >> 16)) & mask;
  var result = ((m_z << 16) + (m_w & 65535)) >>> 0;
  result /= 4294967296;
  return result;
}
