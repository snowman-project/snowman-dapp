interface RequestArguments {
  method: string;
  params?: unknown[] | object;
}

interface EthereumProvider {
  /**
   * Returns true if the provider is connected to the current chain, and false otherwise.
   *
   * @remarks
   * Note that this method has nothing to do with the user's accounts.
   *
   * You may often encounter the word "connected" in reference to whether a web3 site can access the user's accounts. In the provider interface, however, "connected" and "disconnected" refer to whether the provider can make RPC requests to the current chain.
   */
  isConnected(): boolean;

  /**
   * Use request to submit RPC requests to Ethereum via MetaMask. It returns a Promise that resolves to the result of the RPC method call.
   * @param args A `RequestArguments` object.
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  request(args: RequestArguments): Promise<any>;
}
