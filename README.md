**Secret Wallet: One-Click Token Creation on Secret Network**

## Introduction

Secret Wallet is a user-friendly DApp that empowers anyone to seamlessly create a Secret Network wallet and deploy SNIP-20 tokens, all within a single, intuitive interface. It eliminates the technical barriers associated with Secret Network by providing a streamlined, no-code experience.

Note: this was build under 48 hours for the hackathon (because yeah ive came to know about it later)

**Key Features:**

* **Social Login:** Simplify wallet creation by leveraging existing social media accounts for authentication (**Security Note:** This aspect requires careful implementation with robust security measures to protect user privacy and prevent potential vulnerabilities).
* **One-Click Token Creation:** Define token details through a user-friendly interface and deploy your SNIP-20 token with just a click, no coding expertise needed.
* **Planned Expansion:** The roadmap includes incorporating SNIP-721 NFT deployment, transforming Secret Wallet into a comprehensive platform for Secret Network interactions.

**Benefits:**

* **Effortless Token Creation:** Streamline the token creation process by eliminating complex setup or coding requirements.
* **Enhanced Accessibility:** Open up Secret Network to a wider audience by making creating tokens effortless.
* **Security Focus:** While social login offers convenience, the implementation will prioritize user privacy and security with appropriate measures (addressed in the Security Considerations section).
* **Centralized Hub:** Secret Wallet serves as a one-stop shop for both wallet creation and token deployment on Secret Network.

## Existing Ideas and Novelty

There have been efforts to simplify Secret Network interactions, but Secret Wallet offers a unique combination of features:

* **Social Login for Wallet Creation:** While Secret Network tools may offer social login during wallet creation, this DApp focuses specifically on a streamlined one-click experience.
* **No-Code Token Creation:** Existing solutions might require some technical knowledge, but Secret Wallet prioritizes a completely no-code approach.
* **Combined Focus on Wallets and Tokens:** Some tools may address one aspect or the other, but Secret Wallet offers a unified platform for both.

It's important to conduct thorough research to confirm the novelty of social login for Secret Network wallet creation. However, the emphasis on a single-click, no-code process for deploying SNIP-20 tokens presents a distinct value proposition within the Secret Network ecosystem.

## Security Considerations

**Social Login:**

* **Privacy-Preserving Login:** Utilize privacy-focused social login with combination of Web3Auth and Web5Nexus providers that minimize data collection and avoid storing sensitive information within the DApp.
* **User Control:** Provide granular control over data shared with social login providers during wallet creation, it gives users thier private key access as well.
* **Regular Security Audits:** Conduct regular security audits to identify and address any potential vulnerabilities associated with social login integration.

## Current Limitation 
- The WASM file can be only processed in backend, cannot be properly rendered in frontend, things will be updated in near future

**Server-Side Implementation (Considered Approach):**

* **Mitigate Client-Side Risks:** By using a secure server-side layer for Secret Network interactions, we can limit the amount of sensitive information exposed on the client-side.
* **Secure Communication:** Employ robust authentication and authorization mechanisms for communication between the client-side DApp and the server-side infrastructure.
* **Best Practices:** Adhere to industry best practices for secure server-side Secret Network interactions, including key management and transaction handling.

## Installation and Usage (To Be Updated Later)

npm install
npm run start

## Contributing (To Be Updated Later)

This section will outline guidelines and processes for contributing to the project's development.

## License (To Be Updated Later)


## References

* Link to Secret Network documentation: [https://scrt.network/](https://scrt.network/)
* Link to SNIP-20 standard documentation: [https://docs.scrt.network/secret-network-documentation/overview-ecosystem-and-technology/secret-network-overview/private-tokens](https://docs.scrt.network/secret-network-documentation/overview-ecosystem-and-technology/secret-network-overview/private-tokens)

**Disclaimer:** This is a work in progress, and the information provided is subject to change as development progresses.
