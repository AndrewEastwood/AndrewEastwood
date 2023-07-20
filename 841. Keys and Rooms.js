/**
 * @param {number[][]} rooms
 * @return {boolean}
 */
var canVisitAllRooms = function(rooms) {
  const roomsSeen = {};
  const collectedKeys = [];
  for (let i = 0; i < rooms.length; i++) {
    roomsSeen[i] = 0;
  }
  roomsSeen[0]++;
  collectedKeys.push(...rooms[0]);
  while (collectedKeys.length) {
    const nextKey = collectedKeys.pop();
    // open room and collect keys
    roomsSeen[nextKey]++;
    for (let i = 0; i < rooms[nextKey].length; i++) {
      // grab keys for unseen rooms only
      // (omit infinte loop)
      if (!roomsSeen[rooms[nextKey][i]]) {
        collectedKeys.push(rooms[nextKey][i]);
      }
    }
  }
  const allRoomsSeen = Object.values(roomsSeen).indexOf(0) === -1;
  return allRoomsSeen;
};
