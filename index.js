web3 =  new Web3(new Web3.providers.HttpProvider("https://cleanly-star-macaw.quiknode.io/9adc9137-e917-4042-a02b-043fe0d470db/ErG_ISWuYREO5W6dfx835w==/")); //"https://cleanly-star-macaw.quiknode.io/9adc9137-e917-4042-a02b-043fe0d470db/ErG_ISWuYREO5W6dfx835w==/"));
abi = JSON.parse('[{"constant":false,"inputs":[{"name":"candidate","type":"bytes32"}],"name":"totalVotesFor","outputs":[{"name":"","type":"uint8"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"candidate","type":"bytes32"}],"name":"validCandidate","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"","type":"bytes32"}],"name":"votesReceived","outputs":[{"name":"","type":"uint8"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"x","type":"bytes32"}],"name":"bytes32ToString","outputs":[{"name":"","type":"string"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"candidateList","outputs":[{"name":"","type":"bytes32"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"candidate","type":"bytes32"}],"name":"voteForCandidate","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"contractOwner","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"inputs":[{"name":"candidateNames","type":"bytes32[]"}],"payable":false,"type":"constructor"}]')
VotingContract = web3.eth.contract(abi);
// In your nodejs console, execute contractInstance.address to get the address at which the contract is deployed and change the line below to use your deployed address
contractInstance = VotingContract.at('0x11ab41eea77227dcfcf0e953e02a0b7c1979d760');//'0xfd6b23e3d228e3c520669c9f40ff091f7f4f6014');
candidates = {"a": "a", "b": "b", "c": "c"}

function voteForCandidate() {
  candidateName = $("#candidate").val();
  console.log("Voting now!!!");
  contractInstance.voteForCandidate(candidateName, {from: "0x79886E0d96128D286E810FB59571296cc5146805"  }, function() {
      console.log("Vote is happening:  ", candidateName);
    let div_id = candidates[candidateName];
    $("#" + div_id).html(contractInstance.totalVotesFor.call(candidateName).toString());
  });
}

$(document).ready(function() {
  candidateNames = Object.keys(candidates);
  for (var i = 0; i < candidateNames.length; i++) {
    let name = candidateNames[i];
    let val = contractInstance.totalVotesFor.call(name).toString()
    $("#" + candidates[name]).html(val);
  }
});

