import { PrivateKey } from 'o1js';

var privateKey = PrivateKey.random();
var publicKey = privateKey.toPublicKey();

console.log('private key:', privateKey.toBase58());
console.log('public key:', publicKey.toBase58());
