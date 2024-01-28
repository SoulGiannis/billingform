import React, { useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./Global.css"

const billingRuleTypeOptions = [
  'Name: Default ; DO NOT USE',
  'Name: PLRP collector fee ; Fee paid out of PLRP lien',
  'Name: QSF Administration ; QSF Administration: $XX/claimant',
  'Name: Bankruptcy Coordination ; Bankruptcy',
  'Name: Medicare and Medicaid lien verification ("VOE") ; Medicare and Medicaid lien verification ("VOE"): $XX/claimant',
  'Name: PLRP lien verification ("VOE") ; Medicare Part C/ERISA/Private Insurance PLRP lien verification: $XX/claimant',
  'Name: Medicare Global lien resolution ; Resolution of Medicare parts A&B - Global Resolution Model: $XX/claimant/lien',
  'Name: Medicaid lien resolution ; Resolution of Medicaid Interests: $XX/lien',
  'Name: Medicare Traditional lien resolution ; Resolution of Medicare parts A&B - Individual Resolution Model: $XX/Claimant/Lien',
  'Name: PLRP lien resolution ; Resolution of Private/Part C lien via PLRP',
  'Name: PLRP lien resolution - No interest ; Reduced to $YY/lien for initial "no interest"/$0',
  'Name: Non-PLRP Private and Part C lien resolution ; Non-PLRP lien resolution: $XX/lien',
  'Name: Non-PLRP Private/Part C lien resolution - No int ; $XX/lien reduced to $YY for initial "no interest"/$0',
  'Name: Other Governmental lien resolution ; Resolution of Other Government interests: $XX/lien',
  'Name: Other Governmental lien resolution - No interest ; Resolution of Other Government interests: $XX/lien reduced to $YY for initial "no interest"/$0',
  'Name: Bundled ; Flat fee for multiple services',
  'Name: QSF Administration - Non-606 ; QSF Administration fee where no products in LPM',
  'Name: Archive ; Contract was amended; billing rules no longer apply',
  'Name: Placeholder ; Current billing rule configurations cannot handle SOW language',
  'Name: Lien Resolution Questionnaire Processing ; Questionnaire Processing for Lien Resolution',
  'Name: Claims Administration ; Claims Administration',
  'Name: Gov\'t Lien Resolution - All Types - Has Interest ; Combined Gov\'t lien resolution - Has Interest',
  'Name: Gov\'t Lien Resolution - All Types - No Interest ; Combined Govt Lien Res - No Interest Outcome',
  'Name: Gov\'t Lien Resolution - All Types ; Combined Gov\'t lien resolution - no OBP',
  'Name: Probate ; Probate',
  'Name: Other Govt & NonPLRP Lien Res - Has Interest ; Other Govt & NonPLRP Lien Res - Has Interest',
  'Name: Other Govt & NonPLRP Lien Res - No Interest ; Other Govt & NonPLRP Lien Res - No Interest',
  'Name: MSA Opinion Letter ; MSA Opinion Letter',
  'Name: MSA ; MSA',
  'Name: Lien Resolution - Other ; Lien Res fees that don\'t fit the existing categories',
  'Name: Medical Records Review ; Medical Records Review',
  'Name: Investigative Services ; Investigative Services',
  'Name: Lien Design ; Lien Design',
  'Name: Percentage of Savings (SE Only) ; Percentage of Savings (SE Only)',
];

const lienTypeOptions = [
  'Bankruptcy',
  'Contingent Liability',
  'Hospital Lien',
  'IHS Lien',
  'MAR',
  'MSA',
  'MSA - MT',
  'MSA - Opinion Letter',
  'MSA - Opinion Letter - MT',
  'MSA - WC',
  'Medicaid Lien',
  'Medicaid Lien - MT',
  'Medicare - Global',
  'Medicare - No Fault',
  'Medicare Lien',
  'Medicare Lien - Duplicate',
  'Medicare Lien - MT',
  'Medicare Lien - Part C',
  'Military Lien',
  'Military Lien - MT',
  'Part C - PLRP',
  'Private Lien',
  'Private Lien - MT',
  'Private Lien - PLRP',
  'Worker\'s Comp Lien',
];

const collectorSpecificOptions = [
  'yes',
  'no',
]

const pricingTriggersOptions = [
  'Benefits Verified',
  'On Benefits',
  'Has a Lien Amount',
  'Has a Final Demand Amount',
  'QSF Funded',
  'Case Settled',
  'Product Finalized',
  'All Products Finalized',
  'Settlement Amount Between',
  'Is Client Funded',
  'No Interest',
  'Lien Paid Date',
];

const billingTriggersOptions = [
  'Benefits Verified',
  'On Benefits',
  'Has a Lien Amount',
  'Has a Final Demand Amount',
  'QSF Funded',
  'Case Settled',
  'Product Finalized',
  'All Products Finalized',
  'Settlement Amount Between',
  'Is Client Funded',
  'No Interest',
  'Lien Paid Date',
];


const ExcelForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    billingRuleType: '',
    lienTypes: '',
    collectorSpecific: '',
    firstProductPrice: '',
    firstProductLikelihood: '',
    firstProdExpColDate: '',
    secondProductPrice: '',
    secondProductLikelihood: '',
    secondProdExpColDate: '',
    subseqProductPrice: '',
    subseqProductLikelihood: '',
    subseqProdExpColDate: '',
    pricingTriggers: '',
    billingTriggers: '',
    // Add more fields as needed
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
// http://localhost:3001/submitData
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevents the default form submission behavior

    try {
      const response = await axios.post('https://billing-form.onrender.com', { formData });
      console.log(response.data);
      toast.success('Data submitted and updated successfully');

      // Reset form fields to empty values
      setFormData({
        name: '',
        billingRuleType: '',
        lienTypes: '',
        collectorSpecific: '',
        firstProductPrice: '',
        firstProductLikelihood: '',
        firstProdExpColDate: '',
        secondProductPrice: '',
        secondProductLikelihood: '',
        secondProdExpColDate: '',
        subseqProductPrice: '',
        subseqProductLikelihood: '',
        subseqProdExpColDate: '',
        pricingTriggers: '',
        billingTriggers: '',
      });
    } catch (error) {
      console.error('Error submitting data:', error);
      toast.error('Error submitting data. Please try again.');
    }
  };


  return (
    <form className='main-container' onSubmit={handleSubmit}>
      <label>
        Name*
        <input className='input-common' type="text" name="name" value={formData.name} onChange={handleChange} required/>
      </label>
      <label>
        Billing Rule Type*
        <select className='input-common' name="billingRuleType" value={formData.billingRuleType} onChange={handleChange} required>
          <option value="">Select Billing Rule Type</option>
          {billingRuleTypeOptions.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>
      </label>
      <label>
        Lien Types*
        <select className='input-common' name="lienTypes" value={formData.lienTypes} onChange={handleChange} required>
          <option value="">Select Lien Types</option>
          {lienTypeOptions.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>
      </label>
      <label>
    Collector Specific:
      <select className='input-common' name="collectorSpecific" value={formData.collectorSpecific} onChange={handleChange} >
        <option value="">Select Collector Specific</option>
          {collectorSpecificOptions.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
      </select>
  </label>
  <label>
    First Product Price*
    <input className='input-common' type="text" name="firstProductPrice" value={formData.firstProductPrice} onChange={handleChange} required/>
  </label>
  <label>
    First Product Likelihood*
    <input className='input-common' type="text" name="firstProductLikelihood" value={formData.firstProductLikelihood} onChange={handleChange} required/>
  </label>
  <label>
    First Prod Exp Col Date:
    <input className='input-common' type="date" name="firstProdExpColDate" value={formData.firstProdExpColDate} onChange={handleChange} />
  </label>
  <label>
    Second Product Price:
    <input className='input-common' type="text" name="secondProductPrice" value={formData.secondProductPrice} onChange={handleChange} />
  </label>
  <label>
    Second Product Likelihood:
    <input className='input-common' type="text" name="secondProductLikelihood" value={formData.secondProductLikelihood} onChange={handleChange} />
  </label>
  <label>
    Second Prod Exp Col Date:
    <input className='input-common' type="date" name="secondProdExpColDate" value={formData.secondProdExpColDate} onChange={handleChange} />
  </label>
  <label>
    Subseq Product Price*
    <input className='input-common' type="text" name="subseqProductPrice" value={formData.subseqProductPrice} onChange={handleChange} required/>
  </label>
  <label>
    Subseq Product Likelihood*
    <input className='input-common' type="text" name="subseqProductLikelihood" value={formData.subseqProductLikelihood} onChange={handleChange} required/>
  </label>
  <label>
    Subseq Prod Exp Col Date:
    <input className='input-common' type="date" name="subseqProdExpColDate" value={formData.subseqProdExpColDate} onChange={handleChange} />
  </label>
  <label>
    Pricing Triggers:
    <select className='input-common' name="pricingTriggers" value={formData.pricingTriggers} onChange={handleChange}>
      <option value="">Select Pricing Triggers</option>
        {pricingTriggersOptions.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
    </select>
  </label>
  <label>
    Billing Triggers:
      <select className='input-common' name="billingTriggers" value={formData.billingTriggers} onChange={handleChange}>
        <option value="">Select Billing Triggers</option>
          {billingTriggersOptions.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
      </select>
  </label>
      <button className='btn' type="submit">Submit and Update Excel</button>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
  </form>
  );
};

export default ExcelForm;
