window.addEventListener('load', async () => {
    if (window.ethereum) {
        window.web3 = new Web3(ethereum);
        try {
            await ethereum.request({ method: 'eth_requestAccounts' });
            initApp();
        } catch (error) {
            console.error('User denied account access');
        }
    } else if (window.web3) {
        window.web3 = new Web3(web3.currentProvider);
        initApp();
    } else {
        console.log('Non-Ethereum browser detected. You should consider trying MetaMask!');
    }
});

async function initApp() {
    const accounts = await web3.eth.getAccounts();
    const account = accounts[0];

    const abi = [
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "name": "evaluations",
            "outputs": [
                {
                    "internalType": "string",
                    "name": "studentId",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "subject",
                    "type": "string"
                },
                {
                    "internalType": "uint256",
                    "name": "score",
                    "type": "uint256"
                },
                {
                    "internalType": "string",
                    "name": "evaluator",
                    "type": "string"
                },
                {
                    "internalType": "uint256",
                    "name": "timestamp",
                    "type": "uint256"
                },
                {
                    "internalType": "string",
                    "name": "transactionHash",
                    "type": "string"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "getEvaluations",
            "outputs": [
                {
                    "components": [
                        {
                            "internalType": "string",
                            "name": "studentId",
                            "type": "string"
                        },
                        {
                            "internalType": "string",
                            "name": "subject",
                            "type": "string"
                        },
                        {
                            "internalType": "uint256",
                            "name": "score",
                            "type": "uint256"
                        },
                        {
                            "internalType": "string",
                            "name": "evaluator",
                            "type": "string"
                        },
                        {
                            "internalType": "uint256",
                            "name": "timestamp",
                            "type": "uint256"
                        },
                        {
                            "internalType": "string",
                            "name": "transactionHash",
                            "type": "string"
                        }
                    ],
                    "internalType": "struct EducationEvaluation.Evaluation[]",
                    "name": "",
                    "type": "tuple[]"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        }
    ];

    const contractAddress = '0x92e7EF1581f35fa8cb7AD4F7Aea8e44BD93Ade05'; // Replace with your deployed contract address

    const contract = new web3.eth.Contract(abi, contractAddress);

    document.getElementById('searchForm').addEventListener('submit', async (event) => {
        event.preventDefault();
        const studentId = document.getElementById('searchStudentId').value;
        searchEvaluations(studentId);
    });

    async function searchEvaluations(studentId) {
        const evaluations = await contract.methods.getEvaluations().call();
        const searchResults = document.getElementById('searchResults');
        searchResults.innerHTML = '';
    
        evaluations.forEach(evaluation => {
            if (evaluation.studentId === studentId) {
                const li = document.createElement('li');
                li.textContent = `${evaluation.studentId} - ${evaluation.subject} - ${evaluation.score} - ${evaluation.evaluator} - ${new Date(Number(evaluation.timestamp) * 1000).toLocaleString()} - TX: ${evaluation.transactionHash}`;
                searchResults.appendChild(li);
            }
        });
    }
    
}
