import publishClient from "./redis";

async function sub(){
  const subClient = publishClient.duplicate();
  await subClient.connect();

  await subClient.subscribe("logs", (message) => {
    console.log(`Message reçu : ${message}`);
  });
};

// Publish dans logs
async function publish(message: string){
  await publishClient.publish("logs", message);
}

// activer l'ensemble
publishClient.connect().then(async() => {
	// On souscrit au canal "logs" avant de commencer à publier dessus
    await sub();
    
	// On publie un message sur le canal "logs"
   await publish("Service logger en ligne 🔍");
});