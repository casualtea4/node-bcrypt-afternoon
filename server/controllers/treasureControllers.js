// module.exports = {
//     dragonTreasure: async (req,res) => {
//         const db = req.app.get('db');

//         const treasure = await db.get_dragon_treasure()
//         dragon = dragon[0]
//         return res.status(200).send(treasure)
//     },
// }
module.exports = {
    dragonTreasure: async (req, res) => {
      const treasure = await req.app.get('db').get_dragon_treasure(1);
      return res.status(200).send(treasure);
    },
    getUserTreasure: async (req,res) => {
      const db = req.app.get('db');
      const {session} = req;

      const user = await db.get_user_treasure([session.user.id])
      // user = user[0];
      return res.status(200).send(user);
    },
    addUserTreasure: async (req,res) => {
      const {treasureURL} = req.body
      const {id} = req.session.user
      const db = req.app.get('db')

      const userTreasure = await db.add_user_treasure([treasureURL,id])
      // userTreasure = userTreasure[0];
      return res.status(200).send(userTreasure)
    },
    getAllTreasure: async (req,res) => {
      const db = req.app.get('db')
      
      const allTreasure = await db.get_all_treasure();
      // allTreasure = allTreasure[0];
      return res.status(200).send(allTreasure)
    }
  };