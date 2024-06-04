// import './style.css'
 async function getIP() {
  let response = await fetch("https://api.iplocation.net/?cmd=get-ip");
  let data = await response.json();

  return data.ip;
}

export default async function getLocation() {
  let ip = await getIP();
  let response2 = await fetch(`https://ipinfo.io/${ip}?token=0f075b8ac8611a`);
  let location_data = await response2.json();
  
  return location_data;
}

