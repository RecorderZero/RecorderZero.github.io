let web3;
let contract;
let account;
const contractAddress = "0x6480eABB98FFdF8b5dD37074C3a953f4BED41608";
const abi = [
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_startTimestamp",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_endTimestamp",
          "type": "uint256"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "start",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "end",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "address",
          "name": "sender",
          "type": "address"
        }
      ],
      "name": "DeploymentDebug",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "string",
          "name": "msg",
          "type": "string"
        }
      ],
      "name": "Log",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "string",
          "name": "msg",
          "type": "string"
        },
        {
          "indexed": false,
          "internalType": "address",
          "name": "addr",
          "type": "address"
        }
      ],
      "name": "LogAddress",
      "type": "event"
    },
    {
      "inputs": [],
      "name": "owner",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "proposals",
      "outputs": [
        {
          "internalType": "string",
          "name": "description",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "voteCount",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [],
      "name": "secondVote",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "votedVoters",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "name": "voters",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "weight",
          "type": "uint256"
        },
        {
          "internalType": "bool",
          "name": "voted",
          "type": "bool"
        },
        {
          "internalType": "enum Voting.Role",
          "name": "role",
          "type": "uint8"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [],
      "name": "votingEnd",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [],
      "name": "votingEnded",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [],
      "name": "votingStart",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [],
      "name": "winningProposal",
      "outputs": [
        {
          "internalType": "string",
          "name": "description",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "voteCount",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_start",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_end",
          "type": "uint256"
        }
      ],
      "name": "setVotingPeriod",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_start",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_end",
          "type": "uint256"
        }
      ],
      "name": "setSecondVotingPeriod",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "voter",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "weight",
          "type": "uint256"
        }
      ],
      "name": "setWeight",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "voter",
          "type": "address"
        }
      ],
      "name": "getWeight",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "_description",
          "type": "string"
        }
      ],
      "name": "propose",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "proposalIndex",
          "type": "uint256"
        }
      ],
      "name": "vote",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "processWinningProposal",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getWinningProposal",
      "outputs": [
        {
          "components": [
            {
              "internalType": "string",
              "name": "description",
              "type": "string"
            },
            {
              "internalType": "uint256",
              "name": "voteCount",
              "type": "uint256"
            }
          ],
          "internalType": "struct Voting.Proposal",
          "name": "",
          "type": "tuple"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [],
      "name": "getAllProposals",
      "outputs": [
        {
          "components": [
            {
              "internalType": "string",
              "name": "description",
              "type": "string"
            },
            {
              "internalType": "uint256",
              "name": "voteCount",
              "type": "uint256"
            }
          ],
          "internalType": "struct Voting.Proposal[]",
          "name": "",
          "type": "tuple[]"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [],
      "name": "getVotingStatus",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    }
  ];

// async function getStatus() {
//     const status = await contract.methods.getVotingStatus().call();
//     console.log("Now:", status[0], "Start:", status[1], "End:", status[2]);
// }

async function connectWallet() {
  if (window.ethereum) {
    web3 = new Web3(window.ethereum);
    await window.ethereum.request({ method: "eth_requestAccounts" });
    const accounts = await web3.eth.getAccounts();
    console.log(accounts)
    account = accounts[0];
    document.getElementById("walletAddress").innerText = "Connected: " + account;
    contract = new web3.eth.Contract(abi, contractAddress);
    loadProposals();
    // getStatus()
  } else {
    alert("請安裝 MetaMask！");
  }
}
// async function connectWallet() {
//   if (window.ethereum) {
//     web3 = new Web3(window.ethereum);
//     await ethereum.request({ method: "eth_requestAccounts" });
//     account = (await web3.eth.getAccounts())[0];
//     document.getElementById("walletAddress").innerText = "Connected: " + account;
//     contract = new web3.eth.Contract(abi, contractAddress);
//     loadProposals();
//   }
// }

async function propose() {
    const text = document.getElementById("proposalText").value;
    // getStatus()
    try {
        await contract.methods.propose(text).send({ from: account });
    } catch (error) {
        try {
            await contract.methods.propose(text).call({ from: account });
        } catch (error) {
            const reason = extractReason(error.message);
            alert("失敗：" + reason);
            console.error("Revert reason:", reason);
        }
    }
    loadProposals();
}

async function loadProposals() {
  const proposals = await contract.methods.getAllProposals().call();
  let html = "";
  proposals.forEach((p, i) => {
    html += `<div>${i}: ${p.description} - Votes: ${p.voteCount} 
    <button onclick="vote(${i})">Vote</button></div>`;
  });
  document.getElementById("proposals").innerHTML = html;
}

async function loadWinningProposal() {
    console.log("loadWinningProposal")
    const winningProposal = await contract.methods.getWinningProposal().call();
    console.log(winningProposal)
    document.getElementById("processResult").innerHTML = 
        `Winning proposal: ${winningProposal.description}<br>
        Votes: ${winningProposal.voteCount}`;
}

const extractReason = (message) => {
    // console.log(message)
    const match = message.match(/revert\s(.*)/);
    return match ? match[1] : "Unknown error";
};

async function vote(index) {
    // getStatus()
    try {
        
        await contract.methods.vote(index).send({ from: account });
        alert("投票成功！");
    } catch (error) {
        try {
            await contract.methods.vote(index).call({ from: account });
        } catch(error) {
            const reason = extractReason(error.message);
            alert("投票失敗：" + reason);
            console.error("Revert reason:", reason);
        }
    }
    loadProposals();  
}

async function updateVotingPeriod() {
    const startInput = document.getElementById("newStart").value;
    const endInput = document.getElementById("newEnd").value;

    const startOffset = parseInt(startInput);
    const endOffset = parseInt(endInput);

    if (isNaN(startOffset) || isNaN(endOffset) || endOffset <= startOffset) {
        alert("請輸入有效的起始與結束時間（秒），且結束時間必須大於起始時間");
        return;
    }
    // getStatus()

    const now = Math.floor(Date.now() / 1000);
    const newStart = now + startOffset;
    const newEnd = now + endOffset;
    console.log(now, newStart, newEnd)

    try {
        await contract.methods.setVotingPeriod(newStart, newEnd).send({ from: account });
        alert(`⏱ Voting period updated:\nStart: ${newStart}\nEnd: ${newEnd}`);
        loadProposals()
        document.getElementById("processResult").innerHTML = "";
    } catch (error) {
        try {
            await contract.methods.setVotingPeriod(newStart, newEnd).call({ from: account });
        } catch (error) {
            const reason = extractReason(error.message);
            alert("失敗：" + reason);
            console.error("Revert reason:", reason);
        }
    }
}

async function processProposals() {
    // getStatus()
    let receipt = ""
    try {
        
        receipt = await contract.methods.processWinningProposal().send({ from: account });

        console.log("Transaction successful:", receipt);
        
        try {
            console.log("receipt != ''")
            await loadWinningProposal()
            return
        } catch (error) {
            alert("開始第二輪投票")
        } 
    } catch (error) {
        // not owner
        // console.log("not owner")
        try {
            await contract.methods.processWinningProposal().call({ from: account });
        } catch (error) {
            const reason = extractReason(error.message);
            alert("失敗：" + reason);
            console.error("Revert reason:", reason);
        }
    }
    await loadProposals()
}