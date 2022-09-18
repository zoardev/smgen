export type PayoutAddress = {
    address: string,
    percentage: number
}
export type CollectionContractState = {
    form: {
        name: string,
        tokenSymbol: string,
        description: string,
        royalty: number,
        mintPerTransaction: number,
        tokenSupply: number,
        mintPrice: number,
        walletMintLimit: number
        payoutAddresses: PayoutAddress[],
        cid: string,
        folderName: string,
        ownerAddress: string,
        template: string,
    },
    isGenerating: boolean,
    isDeploying: boolean,
    contractAddress: string
}