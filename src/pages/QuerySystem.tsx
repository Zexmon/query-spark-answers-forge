
import React, { useState, useEffect } from 'react';
import { Search, Filter, BookOpen, MessageSquare } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';

interface QAItem {
  id: number;
  question: string;
  answer: string;
  category: string;
}

const QuerySystem = () => {
  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [results, setResults] = useState<QAItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState<string[]>([]);
  const [showResults, setShowResults] = useState(false);

  // Complete dataset with all your questions
  const mockData: QAItem[] = [
    // Fundamental Principles
    {
      id: 1,
      question: "What are the fundamental principles of public buying?",
      answer: "Transparency, competition, fairness, and value for money are the key principles of public procurement. These principles ensure that the procurement process is conducted in an open, competitive manner that provides the best value for public funds while maintaining integrity and accountability.",
      category: "Fundamental Principles"
    },
    {
      id: 2,
      question: "Why is transparency important in public procurement?",
      answer: "Transparency ensures fairness and builds trust in the procurement process by making all procedures visible to stakeholders. It prevents corruption, promotes accountability, and allows for public scrutiny of government spending decisions.",
      category: "Fundamental Principles"
    },
    
    // Procurement Portal
    {
      id: 3,
      question: "What is the Central Public Procurement Portal?",
      answer: "The Central Public Procurement Portal (CPPP) is an e-procurement platform where all public tenders are published and managed. It serves as a centralized system for transparent procurement processes.",
      category: "Procurement Portal"
    },
    {
      id: 4,
      question: "How can vendors register on the CPPP?",
      answer: "Vendors can register by visiting the CPPP website, filling out the vendor registration form, and submitting the required documents including business registration, tax compliance certificates, and other qualifying documents.",
      category: "Procurement Portal"
    },
    
    // Code of Ethics
    {
      id: 5,
      question: "What does the code of ethics in procurement require?",
      answer: "It requires honesty, integrity, accountability, and avoiding conflicts of interest during the procurement process. Officials must maintain impartiality and ensure fair treatment of all bidders.",
      category: "Code of Ethics"
    },
    {
      id: 6,
      question: "Why is a code of ethics necessary for procurement officials?",
      answer: "It helps ensure impartial decisions, prevents corruption, and promotes responsible use of public funds. It establishes clear guidelines for professional conduct and accountability.",
      category: "Code of Ethics"
    },
    
    // Procurement Objective
    {
      id: 7,
      question: "What is the primary objective of public procurement?",
      answer: "To ensure economical and efficient delivery of public goods and services while maintaining transparency. The goal is to achieve best value for money while following fair and competitive processes.",
      category: "Procurement Objective"
    },
    {
      id: 8,
      question: "How does public procurement support economic growth?",
      answer: "It supports local businesses, ensures efficient government spending, and creates jobs. Public procurement can stimulate economic development by providing opportunities for businesses and promoting competition.",
      category: "Procurement Objective"
    },
    
    // Procurement Laws
    {
      id: 9,
      question: "Which laws govern public procurement in India?",
      answer: "General Financial Rules (GFR), CVC guidelines, and the Manual of Policies and Procedures for Purchase of Goods. These provide the legal framework for procurement activities in government organizations.",
      category: "Procurement Laws"
    },
    {
      id: 29,
      question: "What are the consequences of violating procurement rules?",
      answer: "Penalties may include disciplinary action, contract cancellation, blacklisting, or legal proceedings. The severity depends on the nature and extent of the violation.",
      category: "Procurement Laws"
    },
    
    // RTI Act
    {
      id: 10,
      question: "Are procurement records accessible under the RTI Act?",
      answer: "Yes, unless exempted under specific clauses, procurement information must be disclosed under RTI for transparency. This promotes accountability in public spending.",
      category: "RTI Act"
    },
    
    // Accountability
    {
      id: 11,
      question: "What is external accountability in procurement?",
      answer: "Oversight by external bodies like CAG, Parliament, and Vigilance Commissions to ensure fair procurement. These bodies monitor compliance and investigate irregularities.",
      category: "Accountability"
    },
    {
      id: 12,
      question: "Why is external accountability necessary?",
      answer: "It helps prevent misuse of public funds and ensures government procurement remains lawful and ethical. External oversight provides checks and balances in the system.",
      category: "Accountability"
    },
    {
      id: 27,
      question: "Can procurement policies be challenged in court?",
      answer: "Yes, in cases of violation of fundamental rights, rules or corruption, procurement decisions can be legally challenged. Courts can review procurement decisions for fairness and legality.",
      category: "Accountability"
    },
    {
      id: 28,
      question: "Who monitors adherence to procurement guidelines?",
      answer: "CVC, CAG, internal audit departments, and vigilance officers monitor compliance. These bodies ensure that procurement processes follow established guidelines and procedures.",
      category: "Accountability"
    },
    
    // Preferential Purchase
    {
      id: 13,
      question: "What is the policy regarding Khadi goods?",
      answer: "Government departments must give preference to Khadi and handloom products during procurement. This supports traditional industries and promotes employment in rural areas.",
      category: "Preferential Purchase"
    },
    
    // MSE Purchase
    {
      id: 14,
      question: "Why does the government support procurement from MSEs?",
      answer: "To empower small enterprises, promote entrepreneurship, and generate employment. MSE procurement policies help develop the small business sector and create economic opportunities.",
      category: "MSE Purchase"
    },
    {
      id: 15,
      question: "What products are reserved for MSEs?",
      answer: "Products like candles, paper products, and some food items are reserved for MSEs under government policy. This ensures a dedicated market for small enterprises.",
      category: "MSE Purchase"
    },
    {
      id: 16,
      question: "What is mandatory procurement from MSEs?",
      answer: "A minimum of 25% of annual procurement by Central Ministries/Departments must be from MSEs. This policy ensures significant participation of small enterprises in government procurement.",
      category: "MSE Purchase"
    },
    
    // Purchase Preference
    {
      id: 17,
      question: "What is purchase preference for CPSEs?",
      answer: "CPSEs are given preference in government procurement to promote and strengthen public sector enterprises. This helps maintain the viability of public sector companies.",
      category: "Purchase Preference"
    },
    {
      id: 18,
      question: "Which CPSEs are eligible for purchase preference in pharma?",
      answer: "Pharma CPSEs like IDPL and HAL get preference to supply medicines to government departments. This ensures domestic production capability in critical sectors.",
      category: "Purchase Preference"
    },
    
    // Generic Medicines
    {
      id: 19,
      question: "What is the 'Jan Aushadhi' scheme?",
      answer: "A government initiative to provide affordable generic medicines through dedicated retail outlets. It aims to make quality medicines accessible at reasonable prices to all citizens.",
      category: "Generic Medicines"
    },
    {
      id: 20,
      question: "Why promote generic medicines through public procurement?",
      answer: "To reduce healthcare costs and improve access to essential medicines for the public. Generic medicines provide the same therapeutic benefits at lower costs.",
      category: "Generic Medicines"
    },
    
    // Ancillary Units
    {
      id: 21,
      question: "Who are ancillary units in procurement?",
      answer: "Small units supplying parts/components to larger units (often CPSEs) and get preference in procurement. They form an important part of the industrial ecosystem.",
      category: "Ancillary Units"
    },
    
    // Make in India
    {
      id: 22,
      question: "What is 'Make in India' purchase preference?",
      answer: "It mandates preference for goods manufactured in India to boost local industries. This policy promotes domestic manufacturing and reduces import dependency.",
      category: "Make in India"
    },
    {
      id: 23,
      question: "How does 'Make in India' affect foreign bidders?",
      answer: "Foreign bidders must meet minimum local content requirements to qualify in tenders. This ensures that procurement contributes to domestic value addition.",
      category: "Make in India"
    },
    {
      id: 24,
      question: "Is there a threshold value for applying Make in India preference?",
      answer: "Yes, preference is generally applicable above a certain contract value, as notified by the government. This ensures the policy is applied to significant procurement contracts.",
      category: "Make in India"
    },
    
    // Special Procurement
    {
      id: 25,
      question: "What is the policy for procurement of underground machine parts?",
      answer: "Spare parts for underground machines should be procured from approved or OEM vendors ensuring safety and reliability. Safety considerations are paramount in mining operations.",
      category: "Special Procurement"
    },
    {
      id: 26,
      question: "What is the role of OEMs in public procurement?",
      answer: "OEMs ensure supply of genuine parts, compliance with safety standards, and quality assurance. They provide expertise and accountability for critical equipment.",
      category: "Special Procurement"
    },
    
    // Procurement Portal (additional)
    {
      id: 30,
      question: "How is digital procurement monitored?",
      answer: "Through audit trails, e-signatures, and tracking systems on portals like CPPP and GeM. Digital systems provide transparency and accountability in procurement processes.",
      category: "Procurement Portal"
    },

    // Legal Fundamentals
    {
      id: 31,
      question: "What is required for a contract to be considered legally valid?",
      answer: "Competency of parties, mutual consent, free consent, lawful object, consideration, and fulfillment of other legal requirements. All these elements must be present for a contract to be enforceable.",
      category: "Legal Fundamentals"
    },
    {
      id: 32,
      question: "Who is considered competent to enter into a contract?",
      answer: "A person who is of legal age, of sound mind, and not disqualified by law. Competency ensures that parties can understand and fulfill their contractual obligations.",
      category: "Legal Fundamentals"
    },
    {
      id: 33,
      question: "What does 'free consent' mean in a contract?",
      answer: "Consent not caused by coercion, undue influence, fraud, misrepresentation, or mistake. Free consent ensures that agreements are entered into voluntarily and with full understanding.",
      category: "Legal Fundamentals"
    },
    {
      id: 34,
      question: "What makes the object of a contract lawful?",
      answer: "It must not be illegal, immoral, or opposed to public policy. The contract's purpose and objectives must comply with existing laws and social norms.",
      category: "Legal Fundamentals"
    },

    // Contract Communication
    {
      id: 35,
      question: "When is communication of an offer complete?",
      answer: "When it comes to the knowledge of the offeree. The offer must be effectively communicated and understood by the receiving party.",
      category: "Contract Communication"
    },
    {
      id: 36,
      question: "What is required for a valid acceptance of an offer?",
      answer: "Acceptance must be absolute, unqualified, and communicated to the proposer. Any conditions or modifications would constitute a counter-offer rather than acceptance.",
      category: "Contract Communication"
    },
    {
      id: 37,
      question: "Can an offer or acceptance be withdrawn? If yes, when?",
      answer: "Yes, an offer can be withdrawn before acceptance is communicated. Similarly, acceptance can be withdrawn before it reaches the proposer. Timing is crucial for valid withdrawal.",
      category: "Contract Communication"
    },
    {
      id: 38,
      question: "What happens if acceptance differs from the original proposal?",
      answer: "It is treated as a counter-offer, not acceptance. Any modification to the original terms creates a new proposal that requires fresh acceptance.",
      category: "Contract Communication"
    },

    // Execution and Authority
    {
      id: 39,
      question: "Who is authorized to execute contracts on behalf of CIL/Subsidiary Companies?",
      answer: "Persons specifically authorized by the company's internal regulations or power of attorney. Clear delegation of authority ensures valid contract execution.",
      category: "Execution and Authority"
    },
    {
      id: 40,
      question: "What is the contract effective date?",
      answer: "The date on which both parties agree the contract becomes enforceable. This may differ from the signing date and should be clearly specified.",
      category: "Execution and Authority"
    },
    {
      id: 41,
      question: "Why is stamping of contracts important?",
      answer: "To ensure the contract is legally enforceable and admissible in court. Proper stamping as per stamp duty laws is essential for legal validity.",
      category: "Execution and Authority"
    },
    {
      id: 42,
      question: "What are the guidelines for making changes in a concluded contract?",
      answer: "Any changes must be mutually agreed upon and documented formally. Contract amendments require the same level of formality as the original agreement.",
      category: "Execution and Authority"
    },

    // Guidelines
    {
      id: 43,
      question: "What are some general guidelines for entering into contracts?",
      answer: "Ensure clarity, legality, capacity, consent, and proper documentation. All contractual terms should be specific, measurable, and legally compliant.",
      category: "Guidelines"
    },
    {
      id: 44,
      question: "What are the main types of contracts recognized under law?",
      answer: "Fixed-price contracts, cost-plus contracts, time and material contracts, etc. Each type has specific applications and risk allocation mechanisms.",
      category: "Guidelines"
    },
    {
      id: 45,
      question: "What are salient features of the Sale of Goods Act, 1930?",
      answer: "Transfer of ownership, delivery terms, implied conditions, and rights of buyers and sellers. This Act governs the sale of movable goods and associated rights and obligations.",
      category: "Guidelines"
    },

    // Technical Specifications
    {
      id: 46,
      question: "What is the purpose of including specifications in a contract?",
      answer: "To clearly define the quality, type, and standards of goods or services to be delivered. Specifications ensure that delivered items meet exact requirements.",
      category: "Technical Specifications"
    },
    {
      id: 47,
      question: "What does 'Life Cycle Cost' concept mean in procurement?",
      answer: "It considers the total cost of ownership including purchase, operation, maintenance, and disposal. This approach ensures optimal long-term value rather than just initial cost savings.",
      category: "Technical Specifications"
    },
    {
      id: 48,
      question: "Why are brand names sometimes used in tender documents?",
      answer: "To ensure quality and performance standards, but usually with 'or equivalent' clause. Brand specifications help communicate exact requirements while maintaining competition.",
      category: "Technical Specifications"
    },
    {
      id: 49,
      question: "What are essential technical particulars in a tender?",
      answer: "Details like make, model, capacity, dimensions, performance parameters, etc. These specifications ensure bidders understand exact requirements and can provide appropriate solutions.",
      category: "Technical Specifications"
    },
    {
      id: 50,
      question: "What is the role of tender samples?",
      answer: "To help evaluate the quality and compliance of offered products with tender specs. Samples provide physical verification of proposed goods' suitability.",
      category: "Technical Specifications"
    },

    // Supplier Registration
    {
      id: 51,
      question: "Who is considered an eligible and qualified supplier?",
      answer: "A supplier who meets technical, financial, and legal criteria as prescribed by the organization. Qualification ensures capability to fulfill procurement requirements effectively.",
      category: "Supplier Registration"
    },
    {
      id: 52,
      question: "What is the main purpose of supplier registration?",
      answer: "To evaluate and enlist suppliers who are capable of fulfilling procurement requirements. Registration creates a pre-qualified pool of reliable vendors.",
      category: "Supplier Registration"
    },
    {
      id: 53,
      question: "What is required for a firm to be eligible for registration?",
      answer: "Valid documents proving capability, experience, statutory compliance, and product quality. These requirements ensure only competent suppliers are registered.",
      category: "Supplier Registration"
    },
    {
      id: 54,
      question: "What are the registration requirements for safety item suppliers?",
      answer: "They must meet specific safety standards, certifications, and quality benchmarks. Safety items require higher qualification standards due to their critical nature.",
      category: "Supplier Registration"
    },
    {
      id: 55,
      question: "What are the different categories of supplier registration?",
      answer: "General, safety items, capital items, revenue items, etc., based on nature of goods/services. Categorization ensures appropriate expertise for different procurement types.",
      category: "Supplier Registration"
    },
    {
      id: 56,
      question: "What is the typical procedure for registering suppliers?",
      answer: "Submission of application, document verification, evaluation, and approval by the authority. The process ensures thorough assessment of supplier capabilities.",
      category: "Supplier Registration"
    },
    {
      id: 57,
      question: "Who is the competent authority to grant supplier registration?",
      answer: "A designated officer or committee as defined in company policy. Clear authority designation ensures accountability in registration decisions.",
      category: "Supplier Registration"
    },
    {
      id: 58,
      question: "What is the validity period of a supplier's registration?",
      answer: "Usually for a fixed term (e.g., 2–3 years), subject to renewal based on performance. Periodic renewal ensures continued competency and compliance.",
      category: "Supplier Registration"
    },
    {
      id: 59,
      question: "How are deficiencies in registration documents communicated to firms?",
      answer: "Through formal letters or emails requesting clarification or resubmission. Clear communication helps suppliers correct deficiencies promptly.",
      category: "Supplier Registration"
    },
    {
      id: 60,
      question: "What is the procedure for noting changes in name or structure of a registered firm?",
      answer: "The firm must notify the authority with legal documentation of changes. Updates ensure registration records reflect current legal status.",
      category: "Supplier Registration"
    },
    {
      id: 61,
      question: "Under what conditions can a firm be removed from the list of approved suppliers?",
      answer: "Due to non-performance, fraud, poor quality, or legal violations. Removal mechanisms ensure only reliable suppliers remain in the approved list.",
      category: "Supplier Registration"
    },
    {
      id: 62,
      question: "What is empanelment of contractors?",
      answer: "Shortlisting qualified contractors for specific categories of work. Empanelment creates a ready pool of pre-qualified contractors for various projects.",
      category: "Supplier Registration"
    },

    // Vendor Rating
    {
      id: 63,
      question: "What is vendor rating?",
      answer: "A performance evaluation system based on quality, delivery, service, and compliance. Rating systems help identify and reward good performers while addressing poor performance.",
      category: "Vendor Rating"
    },
    {
      id: 64,
      question: "What parameters are used in vendor rating systems?",
      answer: "Timeliness, quality of supplies, responsiveness, and cost-effectiveness. These parameters provide comprehensive assessment of vendor performance.",
      category: "Vendor Rating"
    },

    // Penal Action
    {
      id: 65,
      question: "What penal actions can be taken against suppliers for poor performance?",
      answer: "Warning, suspension, delisting, or blacklisting. Progressive penalties ensure appropriate consequences for different levels of non-performance.",
      category: "Penal Action"
    },

    // Indenting Process
    {
      id: 66,
      question: "What is an indent or purchase requisition (PR)?",
      answer: "A formal request to initiate the purchase of goods or services. It serves as the official authorization to begin procurement activities.",
      category: "Indenting Process"
    },
    {
      id: 67,
      question: "What are the types of procurement covered under indenting?",
      answer: "Capital procurement, revenue procurement, emergency procurement, proprietary purchase. Different types require different approval levels and procedures.",
      category: "Indenting Process"
    },
    {
      id: 68,
      question: "When is the purchase action initiated?",
      answer: "After receiving and verifying a properly filled indent with justification. Proper verification ensures legitimate procurement needs.",
      category: "Indenting Process"
    },
    {
      id: 69,
      question: "What are capital item indents typically raised for?",
      answer: "For plant and machinery, vehicles, and long-term infrastructure equipment. Capital items require higher approval levels due to their significant value and long-term nature.",
      category: "Indenting Process"
    },
    {
      id: 70,
      question: "What items fall under revenue item indents?",
      answer: "General stores, spare parts, consumables, etc. Revenue items are typically for operational needs and have lower individual values.",
      category: "Indenting Process"
    },
    {
      id: 71,
      question: "What is an emergent indent?",
      answer: "A fast-tracked indent for urgent procurement to avoid operational disruption. Emergency procedures allow quicker processing while maintaining essential controls.",
      category: "Indenting Process"
    },
    {
      id: 72,
      question: "What is proprietary purchase indenting?",
      answer: "Indenting when the item can only be procured from a single, authorized manufacturer. Proprietary items require special justification and approval.",
      category: "Indenting Process"
    },
    {
      id: 73,
      question: "What is the flow of indents for capital items?",
      answer: "Originator → Department Head → Materials Management → Approval → Procurement. The flow ensures proper authorization and technical verification.",
      category: "Indenting Process"
    },
    {
      id: 74,
      question: "What is the importance of advance action in long lead capital items?",
      answer: "To ensure timely procurement of items with long manufacturing or delivery timelines. Advance planning prevents operational delays.",
      category: "Indenting Process"
    },

    // Scrutiny & Verification
    {
      id: 75,
      question: "What normal checks are carried out in processing PRs?",
      answer: "Budget availability, specification clarity, justification, and proper approvals. These checks ensure procurement legitimacy and fiscal responsibility.",
      category: "Scrutiny & Verification"
    },
    {
      id: 76,
      question: "What additional checks are required for capital items?",
      answer: "Cost–benefit analysis, ROI justification, and technical vetting. Capital items require more rigorous evaluation due to their strategic importance.",
      category: "Scrutiny & Verification"
    },
    {
      id: 77,
      question: "How are indents scrutinized in the Materials Management Department?",
      answer: "For accuracy, completeness, budget adherence, and priority level. Scrutiny ensures all requirements are properly documented and justified.",
      category: "Scrutiny & Verification"
    },

    // Transparency & Planning
    {
      id: 78,
      question: "Why are procurement projections published?",
      answer: "To promote transparency, attract vendors, and plan better supply chain logistics. Publication helps suppliers prepare and increases competition.",
      category: "Transparency & Planning"
    },

    // Contract Drafting
    {
      id: 79,
      question: "What is the first step in drafting a contract?",
      answer: "Identifying and including the name and address of the contractor. Proper identification ensures clear party recognition and legal enforceability.",
      category: "Contract Drafting"
    },
    {
      id: 80,
      question: "What are the general conditions that govern a contract?",
      answer: "Terms related to performance, delivery, payment, disputes, penalties, and legal compliance. General conditions provide the framework for contract execution.",
      category: "Contract Drafting"
    },
    {
      id: 81,
      question: "What is the purpose of a security deposit or performance bank guarantee?",
      answer: "To safeguard the buyer's interest by ensuring the supplier's fulfillment of contractual obligations. Security provides financial protection against non-performance.",
      category: "Contract Drafting"
    },

    // Delivery Terms
    {
      id: 82,
      question: "How is the delivery date defined in contracts?",
      answer: "It specifies the agreed date by which the supplier must deliver the goods or services. Clear delivery dates ensure accountability and planning.",
      category: "Delivery Terms"
    },
    {
      id: 83,
      question: "What is a provisional delivery date?",
      answer: "A tentative delivery schedule subject to change based on certain conditions like approvals. Provisional dates provide flexibility for complex procurements.",
      category: "Delivery Terms"
    },
    {
      id: 84,
      question: "When is delivery linked with the approval of advance samples?",
      answer: "When final dispatch is allowed only after approval of submitted pre-production samples. This ensures quality compliance before bulk production.",
      category: "Delivery Terms"
    },
    {
      id: 85,
      question: "What does it mean when delivery is linked with the opening of an L/C?",
      answer: "Delivery begins only after the Letter of Credit is opened by the buyer. This provides payment security for the supplier in international transactions.",
      category: "Delivery Terms"
    },
    {
      id: 86,
      question: "Why is delivery sometimes linked with customs registration?",
      answer: "For imported PCD (Project Capital Goods), delivery may depend on prior customs registration. Registration ensures compliance with import regulations.",
      category: "Delivery Terms"
    },
    {
      id: 87,
      question: "How are delivery dates handled in CFR, CIF, and CIP contracts?",
      answer: "These contracts include international delivery terms; the delivery date is linked to port shipment or arrival. International terms define risk and responsibility transfer points.",
      category: "Delivery Terms"
    },
    {
      id: 88,
      question: "What are the dispatch instructions for imported stores?",
      answer: "Specific guidelines on packaging, labeling, shipping method, and documentation for imports. Clear instructions ensure smooth customs clearance and delivery.",
      category: "Delivery Terms"
    }
  ];

  // Initialize categories and data
  useEffect(() => {
    const uniqueCategories = ['All', ...new Set(mockData.map(item => item.category))];
    setCategories(uniqueCategories);
  }, []);

  // Search function - replace with actual API call to your Flask backend
  const handleSearch = async () => {
    if (!query.trim()) {
      setShowResults(false);
      setResults([]);
      return;
    }

    setLoading(true);
    
    // Mock search logic
    let filtered = mockData;
    
    if (query.trim()) {
      filtered = filtered.filter(item => 
        item.question.toLowerCase().includes(query.toLowerCase()) ||
        item.answer.toLowerCase().includes(query.toLowerCase())
      );
    }
    
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(item => item.category === selectedCategory);
    }
    
    setTimeout(() => {
      setResults(filtered);
      setShowResults(true);
      setLoading(false);
    }, 500);
  };

  useEffect(() => {
    if (query.trim()) {
      handleSearch();
    } else {
      setShowResults(false);
      setResults([]);
    }
  }, [query, selectedCategory]);

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-foreground mb-2">
            CIL Manual
          </h1>
          <p className="text-muted-foreground text-lg">
            Search through procurement guidelines, policies, and best practices
          </p>
        </div>

        {/* Search Section */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Search className="h-5 w-5" />
              Search Query
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-4">
              <div className="flex-1">
                <Input
                  placeholder="Enter your question about procurement..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="w-full"
                />
              </div>
              <Button onClick={handleSearch} disabled={loading}>
                {loading ? 'Searching...' : 'Search'}
              </Button>
            </div>

            {/* Category Filter */}
            <div className="flex items-center gap-2 flex-wrap">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Filter by category:</span>
              {categories.map((category) => (
                <Badge
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  className="cursor-pointer transition-colors"
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Results Section - Only show when there's a search query */}
        {showResults && (
          <div className="grid gap-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold text-foreground">
                Search Results ({results.length})
              </h2>
            </div>

            <ScrollArea className="h-[600px]">
              <div className="space-y-4 pr-4">
                {results.map((item) => (
                  <Card key={item.id} className="transition-shadow hover:shadow-md">
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between gap-4">
                        <CardTitle className="text-lg leading-tight">
                          <MessageSquare className="h-4 w-4 inline mr-2 text-primary" />
                          {item.question}
                        </CardTitle>
                        <Badge variant="secondary" className="shrink-0">
                          {item.category}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-start gap-3">
                        <BookOpen className="h-4 w-4 text-primary mt-1 shrink-0" />
                        <p className="text-muted-foreground leading-relaxed">
                          {item.answer}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                ))}

                {results.length === 0 && !loading && (
                  <Card>
                    <CardContent className="text-center py-12">
                      <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-foreground mb-2">
                        No results found
                      </h3>
                      <p className="text-muted-foreground">
                        Try adjusting your search query or category filter
                      </p>
                    </CardContent>
                  </Card>
                )}
              </div>
            </ScrollArea>
          </div>
        )}

        {/* Welcome message when no search is performed */}
        {!showResults && !query.trim() && (
          <Card>
            <CardContent className="text-center py-12">
              <Search className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-medium text-foreground mb-2">
                Welcome to CIL Manual
              </h3>
              <p className="text-muted-foreground mb-4">
                Start by entering a search query to find relevant procurement information
              </p>
              <p className="text-sm text-muted-foreground">
                Database contains {mockData.length} questions across {categories.length - 1} categories
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default QuerySystem;
