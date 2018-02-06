// Do not change these configurations after the blockchain is initialized
module.exports = {
    // INFO: The mining reward could decreases over time like bitcoin. See https://en.bitcoin.it/wiki/Mining#Reward.
    MINING_REWARD: 50,
    // INFO: Usually it's a fee over transaction size (not quantity)
    FEE_PER_TRANSACTION: 1,
    // INFO: Usually the limit is determined by block size (not quantity)
    TRANSACTIONS_PER_BLOCK: 2,
    genesisBlock: {
        index: 0,
        previousHash: '0',
        timestamp: 1517702400,
        nonce: 0,
        transactions: [
            {
                id: '63ec3ac02f822450039df13ddf7c3c0f19bab4acd4dc928c62fcd78d5ebc6dba',
                hash: null,
                type: 'regular',
                data: {
                    inputs: [],
                    outputs: []
                }
            }
        ]
    },
    pow: {
        getDifficulty: (blocks, index) => {
            // Proof-of-work difficulty settings
            const BASE_DIFFICULTY = Number.MAX_SAFE_INTEGER;
            const EVERY_X_BLOCKS = 5;
            const POW_CURVE = 5;

            // INFO: The difficulty is the formula that naivecoin choose to check the proof a work, this number is later converted to base 16 to represent the minimal initial hash expected value.
            // INFO: This could be a formula based on time. Eg.: Check how long it took to mine X blocks over a period of time and then decrease/increase the difficulty based on that. See https://en.bitcoin.it/wiki/Difficulty
            return Math.max(
                Math.floor(
                    BASE_DIFFICULTY / Math.pow(
                        Math.floor(((index || blocks.length) + 1) / EVERY_X_BLOCKS) + 1
                        , POW_CURVE)
                )
                , 0);
        }
    },
    bitcoin: {
    		nextBlockDifficulty: (blocks) => {
    			const EVERY_X_BLOCKS = 100;
    			// Estimated completion time for X blocks.
    			const EXPECTED_BLOCK_COMPLETION_TIME = 604800 // 1 week.
    			
    			let index = blocks.length - 1;
    			
    			// Initially assume new blocks difficulty is the same as the one at the end of the chain.
    			difficulty = blocks[index].difficulty;
    			
    			// If the index of the block at the end of the chain indicates that a difficulty adjustment may need to take place (for the next block).
    			if ( index % EVERY_X_BLOCKS == 0 ) {
    				
    				// Propose to adjust difficulty based on ratio between expected completion time of last block set and actual completion time.
    				let adjustment = difficulty * ( EXPECTED_BLOCK_COMPLETION_TIME / ( blocks[index].timestamp - blocks[index - EVERY_X_BLOCKS].timestamp ) );
    				
    				// Don't make any adjustments that are too extreme.
    				if ( adjustment > ( difficulty * 4 ) ) {
    					
    					difficulty = difficulty * 4;
    					
    				} else if ( adjustment < ( difficulty * 0.25 ) ) {
    					
    					difficulty = difficulty * 0.25;
    					
    				} else {
    					
    					difficulty = adjustment;
    					
    				}
    				
    			}
    			
    			// Return difficulty unchanged, or adjusted.
    			return difficulty;
    		},
    		// NB. This is really the target.
    		getDifficulty: (blocks, index) => {
    			const BASE_DIFFICULTY = Number.MAX_SAFE_INTEGER; // (base target)
    			console.log(blocks[(index || blocks.length) - 1].difficulty);
    			// Either the difficulty of the block at the supplied index, or the difficulty of the last block.
    			return BASE_DIFFICULTY / blocks[(index || blocks.length) - 1].difficulty;
        }
    }
};