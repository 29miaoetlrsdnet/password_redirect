async function generate(){

const password = "YOUR_PASSWORD";
const url = "https://example.com";
const salt = "random_salt";

const enc = new TextEncoder();

const keyMaterial = await crypto.subtle.importKey(
"raw",
enc.encode(password),
"PBKDF2",
false,
["deriveKey"]
);

const key = await crypto.subtle.deriveKey(
{
name:"PBKDF2",
salt:enc.encode(salt),
iterations:150000,
hash:"SHA-256"
},
keyMaterial,
{ name:"AES-GCM", length:256 },
true,
["encrypt"]
);

const iv = crypto.getRandomValues(new Uint8Array(12));

const encrypted = await crypto.subtle.encrypt(
{ name:"AES-GCM", iv },
key,
enc.encode(url)
);

function toBase64(buffer){
return btoa(String.fromCharCode(...new Uint8Array(buffer)));
}

console.log("salt:", salt);
console.log("iv:", toBase64(iv));
console.log("ciphertext:", toBase64(encrypted));

}

generate();
