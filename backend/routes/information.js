const bankingPolicies = {
    antiMoneyLaundering: {
        policyName: "Anti-Money Laundering (AML)",
        description: "Prevent illegal financial activities by identifying and reporting suspicious transactions.",
        objectives: [
            "Detect and prevent money laundering activities",
            "Ensure transparency in financial transactions",
            "Protect financial institutions from misuse"
        ],
        regulatoryBodies: ["Financial Intelligence Unit", "Central Bank"],
        complianceRequirements: {
            KYC: "Know Your Customer verification for all account holders",
            transactionMonitoring: "Monitor large or suspicious transactions",
            reporting: "Report any suspicious activity to the authorities"
        },
        penalties: "Fines and sanctions for non-compliance",
    },
    financialInclusion: {
        policyName: "Financial Inclusion Initiative",
        description: "Promote access to banking services for all citizens, especially underserved communities.",
        objectives: [
            "Increase access to financial services",
            "Promote digital banking solutions",
            "Provide affordable credit options"
        ],
        targetGroups: ["Low-income households", "Rural communities", "Small businesses"],
        initiatives: ["Digital wallets", "Microfinancing programs", "Rural bank branches"],
        benefits: [
            "Reduce economic inequality",
            "Encourage savings and investment",
            "Support small businesses"
        ]
    },
    interestRateRegulation: {
        policyName: "Interest Rate Regulation",
        description: "Regulate interest rates on loans and savings to maintain economic stability.",
        objectives: [
            "Control inflation",
            "Support economic growth",
            "Ensure fair lending practices"
        ],
        regulatoryBody: "Central Bank",
        controls: {
            maximumInterestRate: "Set a maximum interest rate on loans",
            minimumDepositRate: "Set a minimum interest rate on deposits"
        }
    },
    dataPrivacyProtection: {
        policyName: "Banking Data Privacy Protection",
        description: "Safeguard personal and financial data of banking customers.",
        objectives: [
            "Protect customer data from unauthorized access",
            "Ensure compliance with data privacy laws",
            "Enhance trust in digital banking"
        ],
        requirements: {
            dataEncryption: "Encrypt sensitive customer information",
            accessControl: "Limit data access to authorized personnel",
            breachReporting: "Report data breaches to authorities"
        },
        regulatoryBodies: ["Data Protection Authority", "Central Bank"]
    }
};

module.exports = bankingPolicies;