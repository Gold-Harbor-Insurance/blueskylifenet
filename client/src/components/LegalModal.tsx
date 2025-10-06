import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";

interface LegalModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: "privacy" | "terms" | null;
}

export default function LegalModal({ isOpen, onClose, type }: LegalModalProps) {
  const privacyContent = `Privacy Policy

Last Updated: June 11, 2024

Gold Harbor Insurance owns and operates each website that displays this Privacy Notice (each, a "Site").

Your privacy is important to us. We created this Privacy Notice to explain how we collect, use, and share the information that we collect from and about you.

Data Collected
Data You Provide: We collect data that you provide to us when you interact with the Site or sites owned by third-parties with whom we have contractual relationships, including sites you visit prior to coming to this Site ("Media Partners"). In most cases when you come to the Site we will automatically gather or receive technical data about your prior journey, device and how you interact with our Site ("Technical Data"). Technical Data may include browser type, referrer URL, date and time of website access, IP address, and other identifiers.

We gather additional data if you elect to engage with the Site or certain sites owned by our Media Partners. This includes contact information you elect to provide (e.g., name, address, email address, telephone number) about yourself or third parties to us and our Media Partners. (For example, if you elect to click on one of our advertisements on a Media Partner's site that Media Partner may pass your contact information to us). We refer to the information you elect to provide as "Provided Attributes." You will be directly informed of any third party data sharing at the point your data is transferred.

Third Party Data: In some cases, we may augment the Technical Data and any Provided Attributes with Third Party Data. "Third Party Data" includes information from third parties such as credit reporting agencies. (We will only obtain credit reporting information with your consent, and will not retain any Social Security number you provide). Third Party Data may also include information intended to validate the data you provide (e.g., phone number, Vehicle Identification Number, outstanding debt, criminal record, and address).

Cookie and Similar Data: When you use this Site, we may recognize you or your device through use of a "cookie" or other tracking technology. These technologies act as unique identifiers and allow us to tailor this Site to your specified interests and track your activity on this Site. This information may be added to your user profile and used to deliver offers and advertisements that we believe are relevant to your interests.

We have contractual relationships with advertisers, advertising agencies and other intermediaries that have advertisers as clients (collectively, "Advertising Partners"). Our Media Partners and Advertising Partners (collectively, "Partners") may also utilize third-party cookies and other tracking technologies like clear pixel GIFs (i.e., web beacons) to identify you. We and our Partners may use these technologies to measure responses to emails and page views on this Site and our Partners' websites. You may encounter cookies from our Partners on this Site because we permit our Partners to place cookies. Those cookies are subject to our Partners' privacy notices.

Tracking Options and California Do Not Track Disclosures: Certain Sites require cookies to function efficiently. We may use cookies to deliver advertising we believe is relevant to you and to link data collected across other devices you use. You can adjust your setting to limit tracking or decline cookies, but, as a result, you may not be able to use certain features of this Site or take full advantage of all of our offerings. Please refer to your device or browser settings for more information on how to adjust tracking and/or delete cookies. Your browser settings may allow you to automatically transmit a "Do Not Track" signal to websites and online services you visit. Note, however, there is no industry consensus as to what site and app operators should do with regard to these signals. Accordingly, we do not monitor or take any action with respect to "Do Not Track" signals or other mechanisms. For more information on "Do Not Track," visit http://www.allaboutdnt.com.

Data Use
We use the data we collect from and about you through this Site primarily to connect you with Advertising Partners who can provide you with information about the products and services you are seeking. We generally do this using Technical Data and Provided Attributes, but in certain cases (e.g. lending products) we may also use Third Party Data.

For example, we may have an auto insurance Partner who is only licensed in certain states. We may use Technical Data or Provided Attributes to determine if you are a resident of one of those states. We refer to Advertising Partner requirements generally as "segmentation" and the alignment of consumer data and segments as "matching."

We may also use the data we collect from and about you to (i) respond to your requests (e.g., receive white papers, email, phone calls or texts); (ii) to keep you informed of our products and services (and those of our Partners); (iii) to allow you to send message through this Site; (iv) to improve our Sites and business; (v) to fulfill any purchase you make; and (vi) to use your data in an aggregated, non-specific format for analytic and demographic purposes. We use Technical Data to monitor and optimize the effectiveness of this Site and our advertising spend. We use cookie data to personalize this Site, and other Gold Harbor Insurance websites you visit, by delivering content that is relevant to you.

Data Sharing
In addition to the primary Data Use described above (i.e., sharing your data with Advertising Partners and third parties for the purpose of providing you with information about the products and services you are seeking), we may share your data as follows: (i) with other Gold Harbor Insurance businesses; (ii) with service providers who assist us in compliance and verification activities (e.g., credit agencies), or provide services such as payment processing, IT, and data analysis; (iii) to a buyer or other successor in the event of a merger, divestiture, restructuring, reorganization, dissolution, or other sale or transfer of some or all of Gold Harbor Insurance's assets; (iv) for any other purpose disclosed by us when you provide the information; and (v) with your consent.

We may also disclose the data we collect from and about you to (i) comply with legal processes; (ii) to respond to lawful requests from authorities (including public and government authorities outside your country of residence, and including to meet national security or law enforcement requirements); (iii) to enforce our Terms of Service and this Privacy Notice; (iv) to protect our business, rights, privacy, safety, or property or that of others; and (v) as necessary under applicable law.

Other Websites
This Site may contain links to websites that are not owned and operated by us. We are not responsible for the content or practices of such websites, including their practices with respect to your data. We have no responsibility or liability for such practices, and such practices govern your use of those websites. If this Site includes any mapping features, those mapping features are powered by Google, Inc. and governed by Google's privacy policy, as amended from time to time.

Security
We have taken certain physical, technical, and administrative steps to protect the data we collect from and about Site users. We use commercially reasonable efforts to encrypt sensitive data such as credit card number and personal health data. We use certain reasonable security measures to help protect your personal information. However, no electronic data transmission or storage of information can be guaranteed to be 100% secure. Please note that we cannot ensure or warrant the security of any information you transmit to us, and you use the Site and provide us with your information at your own risk.

Children
We do not knowingly collect, use, or share the personal data of children under the age of 13 and this Site is not directed to individuals under 13. If we are made aware that we have collected personal data from an individual under age 13 we will delete this information as soon as possible.

Retention Period
In general, we will retain your data for as long as is needed to connect you with Advertising Partners who can provide you with information about the products and services you are seeking, which is typically 30-180 days. We will typically retain an archived copy of your data for six years as required or permitted by law for legal and compliance purposes.

Information for California Consumers
The California Consumer Privacy Act ("CCPA") affords certain rights and protections to California residents. This section is intended to further describe (i) the categories and sources of data that Gold Harbor Insurance collects, sells or shares; (ii) the purpose for collection; (iii) the types of third parties to whom Gold Harbor Insurance discloses that information; and (iv) details about how California residents can exercise their rights under the CCPA.

Categories of Data Gold Harbor Insurance Collects. Gold Harbor Insurance collects the following CCPA categories of data: (i) identifiers, such as a name, email address, telephone number, postal address, unique personal identifier, online identifier, IP address, account name, Social Security number, driver's license number; (ii) personal identifiers under Cal. Civ. Code § 1798.80(e), such as insurance policy number, education, employment status, bank account information, credit card number, debit card number, medical information, health insurance information; (iii) characteristics of protected classifications under California or federal law, such as race, color, sex/gender, age, religion, sexual orientation, gender identity, gender expression, marital status, medical condition, ancestry, genetic information, disability, citizenship status, and military and/or veteran status; (iv) commercial information, such as information about products or services purchased, obtained, or considered, or other purchasing or consuming histories or tendencies, vehicle ownership; (v) biometric information; (vi) internet or other electronic network activity information, such as browsing history, clickstream data, web pages visited before or after using the Site, search history, information regarding interaction with websites, applications, or advertisements; (vii) geolocation data; and (viii) inferences drawn from any of the information identified above to create a profile reflecting preferences, characteristics, trends, predispositions, behavior, attitudes, intelligence, abilities, and aptitudes.

Gold Harbor Insurance generally collects the above data as Technical Data or Provided Attributes. For example, Gold Harbor Insurance does not create user profiles to determine the gender, marital status or employment status of consumers. Gold Harbor Insurance receives each of those categories of data only as self-reported data from the consumer.

Data Sources
Gold Harbor Insurance: Gold Harbor Insurance collects Technical Data and Provided Attributes from consumers who land on or engage with our Sites, our call centers or other Gold Harbor Insurance owned-properties (e.g., in response to emails from or on behalf of Gold Harbor Insurance).

Partners and Third Parties: Consumers who visit websites owned by our Media Partners may be redirected to our Sites. In some cases, we may gather data directly from Media Partner websites, or Media Partners or other third parties may post data to our Sites or otherwise transfer data to us. This may occur via display ads, click listings, inquiry forms or telephonic transfers from Media Partner call centers. Our Advertising Partners may also provide us with data.

Service Providers: Gold Harbor Insurance engages service providers to perform a variety of functions (e.g., verifying consumer consent, validating email addresses or phone numbers).

Authorization: We require all parties from whom we receive data, whether they are Partners, Service Providers or other third parties, to represent and warrant to us that they have appropriately obtained the data provided to us and have the authority to share the data with us.

Purpose for Data Collection
As described above in "Data Use," Gold Harbor Insurance primarily uses the data it collects to connect consumers with Advertising Partners who can provide information about the products and services those consumers are seeking.

Categories of Third Parties with Whom Gold Harbor Insurance Discloses Personal Data. In addition to the sharing for the primary use described in "Data Sharing," we do not share information without your consent with third-party service providers who assist us in operating our website, conducting our business, or servicing you, but with your consent.

We do not sell, trade, or otherwise transfer your personal information like phone number to third parties/affiliates/business partners.

Categories of Data Sold. As described above in "Data Use" and "Data Sharing," Gold Harbor Insurance may transfer Technical Data, Provided Attributes and Third Party Data to Advertising Partners who can provide the consumer with information about the products and services they are seeking. We may receive a fee for the transfer of that data or when the consumer purchases a product or service.

CCPA Rights. The CCPA affords certain rights and protections to California residents including: (i) the right to request that we delete any "personal information" that we have collected from you ("Right to Delete"); (ii) the right to request that we disclose the categories and/or specific pieces of personal information collected and sold ("Right to Know"); and (iii) the right to direct us not to sell their "personal information" ("Right to Opt-Out"). "Personal information" is defined pursuant to the CCPA.

California residents who would like to submit a Request to Know, Delete, or Opt-Out should follow the links below. You may also submit a Request to Know by calling our toll-free number (877) 790-1817. Upon submission, you will be asked to verify your email address. If we are able to verify your Request to Know or Delete, (e.g., that you are a California resident and that we have or have sold, as the case may be, your "personal information"), we will respond within 45 days of your request and comply with your request pursuant to the CCPA and applicable law.

Information for European Consumers
Our Site and business are operated in the United States. If you are located outside of the United States any data you provide will be transferred to and processed in the United States. For residents of the European Union (and the United Kingdom), Gold Harbor Insurance, is the data controller for your data collected under this Privacy Notice. We process your data pursuant to your consent, where legally required to do so, or where we have a legitimate interest, such as using your data to improve our business. You can withdraw your consent at any time. If you have complaints or privacy rights requests (e.g., the right to access or delete the data we have collected) please contact us at the email address or telephone number listed below. You may have the right to lodge a complaint with a supervisory authority in the EEA. We will retain your data only so long as is necessary to fulfill the purposes outlined in this Privacy Notice or pursuant to applicable law.

Changes to this Privacy Notice
We may update this Privacy Notice from time to time. We will post any updates on this page with the "Last Updated" date at the top. Your continued use of the Site following the posting of changes to this Privacy Notice will be deemed to constitute your acceptance of such changes.

Contact Us
If you have any questions regarding this Privacy Notice, please contact us at support@goldharborinsurance.com or call (877) 790-1817.`;

  const termsContent = `Terms of Use

Last Updated: June 11, 2024

The following terms and conditions (the "Terms of Use") govern your use of the services offered through Gold Harbor Insurance (collectively, the "Site"). By using the Site, you accept and agree to these Terms of Use. If you do not agree to these Terms of Use, please do not use or access the Site. The terms "we," "us," or "the Company" all refer to Gold Harbor Insurance.

This arbitration agreement includes claims related to our clients, vendors, and Marketing Partners, which are third party beneficiaries of this arbitration agreement.

Accessing Our Site
You may only use the Site if you live in the United States and are at least 18 years old. Otherwise, you may not use our Site. We reserve the right, for any reason, in our sole discretion, to terminate, change, suspend, and/or discontinue any aspect of the Site. We may also impose limits on certain features of the Site or restrict your access to part of or the entire Site, without notice or penalty. Gold Harbor Insurance does not charge users for use of the Site.

What We Do
The Site enables insurance agents, insurance companies, carriers, and other similar parties who are customers of the Site (each a "Service Provider") to offer for sale and to sell, insurance and other products to you. Once you provide us with the information required on our form, we attempt to match you with appropriate insurance agents, brokers, carriers or other service providers to help you acquire the type of insurance you are seeking. We do not issue insurance contracts or bind coverage. Gold Harbor Insurance is not an insurance company, insurance agency, or insurance producer, and we do not sell insurance. Instead, our role is to connect you with third-party Service Providers for the purpose of providing a quote for insurance coverage. Any information submitted through the Site does not guarantee a quote or policy, and any information you receive from Service Providers regarding insurance quotes or policies is not provided by us.

User Data; Consent To Be Contacted
In the course of your use of the Site, you may be asked to provide information or materials to us ("User Data"). User Data includes, for example, information you submit to us via your application to receive quotations. Our information collection and usage practices are set forth in our Privacy Policy which is incorporated herein by reference. You acknowledge and agree that you are solely responsible for the accuracy and content of the User Data. We may delete or destroy any such User Data at any time and for any reason.

By providing your contact information to us through the Site, you agree to receive communications from us directly, on our website or through a third party. We will periodically send you e-mails with offers and promotions. We may also contact you by telephone using an automated dialing system along with a pre-recorded message or interactive voice response system. If you no longer wish to receive these communications, please let us know by sending an email to Gold Harbor Insurance at support@goldharborinsurance.com or by calling (877) 790-1817.

In addition, by submitting a request for quotes through the Site, you consent to be contacted by our Service Providers. Once your information is submitted to these Service Providers, any request to opt-out or unsubscribe from their communications must be directed to the Service Providers.

Exclusive Company Ownership Of Rights
The Site and any necessary software used in connection with the Site contain proprietary and confidential information that is protected by intellectual property laws in applicable jurisdictions. You acknowledge and agree that information and materials presented through the Site is protected by copyrights, trademarks, service marks, patents or other proprietary rights and laws. Except as expressly permitted by applicable law or as authorized by us, you agree not to modify, sell, distribute, transmit, broadcast, publicly display or reproduce any content retrieved from the Site.

Gold Harbor Insurance grants you a personal, non-transferable and non-exclusive right and license to use the Site on a computer or other Internet device; provided that you do not (and do not allow any third party to) copy, reproduce, distribute, reverse engineer or otherwise exploit any content, code, data or materials on the Site. You agree not to modify the Site in any manner or form, nor to use modified versions of the Site for any purpose. We do not grant any license or other authorization to any user of our trademarks, service marks or other proprietary materials.

Any questions, comments, suggestions, or materials submitted to us through the Site will become our sole property. We will own all rights in such materials, and have the unrestricted right to use, publish and otherwise disseminate such information for any purpose, without attribution or compensation.

DISCLAIMER OF WARRANTIES
THE SITE, INCLUDING ALL CONTENT, SERVICES, FUNCTIONS, SOFTWARE, MATERIALS AND INFORMATION MADE AVAILABLE ON OR ACCESSED THROUGH THE SITE, IS PROVIDED "AS IS." TO THE FULLEST EXTENT PERMISSIBLE BY LAW, WE MAKE NO REPRESENTATIONS OR WARRANTIES OF ANY KIND WHATSOEVER FOR THE CONTENT ON THE SITE OR THE SERVICES, INFORMATION, FUNCTIONS AND MATERIALS, MADE ACCESSIBLE BY THE SOFTWARE USED ON OR ACCESSED THROUGH THE SITE, FOR ANY SERVICES OR PRODUCTS OR HYPERTEXT LINKS TO THIRD PARTIES OR FOR ANY BREACH OF SECURITY ASSOCIATED WITH THE TRANSMISSION OF SENSITIVE INFORMATION THROUGH THE SITE OR ANY LINKED SITE. WE DO NOT WARRANT THAT THE FUNCTIONS CONTAINED IN THE SITE WILL BE UNINTERRUPTED OR ERROR-FREE, OR THAT DEFECTS WILL BE CORRECTED, OR THAT THE SITES OR THE SERVERS THAT MAKE THEM AVAILABLE ARE FREE OF VIRUSES OR OTHER HARMFUL COMPONENTS.

LIMITATION OF LIABILITY
IN NO EVENT WILL THE COMPANY, THE SITE, OUR SUBSIDIARIES, AFFILIATES, OFFICERS, DIRECTORS, SHAREHOLDERS, AND/OR EMPLOYEES BE LIABLE FOR ANY LOST PROFITS, COVER, LOSS OF REVENUE OR ANY INDIRECT, CONSEQUENTIAL, SPECIAL, INCIDENTAL, OR PUNITIVE DAMAGES ARISING OUT OF, BASED ON, OR RESULTING FROM YOUR USE OF THE SITE AND/OR ANY TRANSACTION BETWEEN PROVIDERS AND PROSPECTS OR BETWEEN SITE USERS GENERALLY, EVEN IF WE HAVE BEEN ADVISED OF THE POSSIBLITY OF SUCH DAMAGES. THESE LIMITATIONS AND EXCLUSIONS APPLY WITHOUT REGARD TO WHETHER THE DAMAGES ARISE FROM (1) BREACH OF CONTRACT, (2) BREACH OF WARRANTY, (3) NEGLIGENCE, OR (4) ANY OTHER CAUSE OF ACTION, TO THE EXTENT SUCH EXCLUSION AND LIMITATIONS ARE NOT PROHIBITED BY APPLICABLE LAW. IF YOU ARE DISSATISFIED WITH THE SITE, OR DO NOT AGREE TO ANY PROVISIONS OF THESE TERMS OF USE, YOUR SOLE AND EXCLUSIVE REMEDY IS TO DISCONTINUE USING THE SITE.

Links
Gold Harbor Insurance provides links to other sites for informational purposes only. We do not control and, thus, have no responsibility for the accuracy of information provided by these other sites. The availability of these links does not constitute an endorsement of or association with such sites or the content, products, advertising or other materials presented on such sites. You acknowledge and agree that we are not responsible or liable, directly or indirectly, for any damage or loss caused or alleged to be caused by or in connection with use of or reliance on any such content, goods or services available on or through any such third-party web sites or services.

Updates
These Terms of Use are subject to change from time to time and at any time, and such changes will be effective upon posting to the Site. Use of the Site following any modifications to the Terms of Use signifies your acceptance of such modifications.

Applicable Laws
This agreement is governed by the laws of the State of Delaware, United States of America, excluding its choice of law rules. You irrevocably agree that such jurisdiction and venue will be the sole and exclusive jurisdiction and venue of any legal dispute. You covenant not to sue us in any other forum for any cause of action. Our failure to exercise or enforce any right or provision of these Terms shall not constitute a waiver of any such right or provision. If for any reason a court of competent jurisdiction finds any provision of this agreement, or portion thereof, to be unenforceable, that provision shall be enforced to the maximum extent permissible so as to give effect to the intent of this agreement, and the remainder of these Terms of Use shall continue in full force and effect.`;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            {type === "privacy" ? "Privacy Policy" : "Terms of Use"}
          </DialogTitle>
        </DialogHeader>
        <ScrollArea className="h-[60vh] pr-4">
          <div className="whitespace-pre-wrap text-sm leading-relaxed">
            {type === "privacy" ? privacyContent : termsContent}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
