import React, { useState } from 'react';
import axios from 'axios';
import {
    Package,
    MapPin,
    Calendar,
    Thermometer,
    Anchor,
    IndianRupee,
    Truck,
    AlertCircle,
    FileText,
    Box,
    Weight,
    Maximize
} from 'lucide-react';


const InputField = ({ icon: Icon, label, ...props }) => (
    <div className="relative">
        <label className="block text-xs font-medium text-gray-600 mb-1.5">
            {label}
        </label>
        <div className="relative">
            {Icon && (
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Icon className="h-4 w-4 text-gray-400" />
                </div>
            )}
            <input
                className={`
          w-full ${Icon ? 'pl-9' : 'pl-3'} pr-3 py-2 
          bg-white border border-gray-200 rounded-md
          text-sm text-gray-900 placeholder-gray-400
          focus:border-gray-300 focus:ring-1 focus:ring-gray-200
          transition-all duration-200
        `}
                {...props}
            />
        </div>
    </div>
);

const SelectField = ({ icon: Icon, label, children, ...props }) => (
    <div className="relative">
        <label className="block text-xs font-medium text-gray-600 mb-1.5">
            {label}
        </label>
        <div className="relative">
            {Icon && (
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Icon className="h-4 w-4 text-gray-400" />
                </div>
            )}
            <select
                className={`
          w-full ${Icon ? 'pl-9' : 'pl-3'} pr-8 py-2 
          bg-white border border-gray-200 rounded-md
          text-sm text-gray-900 appearance-none
          focus:border-gray-300 focus:ring-1 focus:ring-gray-200
          transition-all duration-200
        `}
                {...props}
            >
                {children}
            </select>
            <div className="absolute inset-y-0 right-0 pr-2 flex items-center pointer-events-none">
                <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </div>
        </div>
    </div>
);

// --- MAIN COMPONENT ---

const ETenderForm = () => {
    const [formData, setFormData] = useState({
        incoterm: '',
        pickup: '',
        destination: '',
        cargoValue: '',
        pickupSchedule: '',
        cargoGoods: '',
        temperatureRequirement: '15°C - 25°C',
        weight: '',
        volume: '',
        dimension: '',
        shippersCount: '',
        palletCount: '',
        portOfLoading: '',
        portOfDischarge: '',
        acceptCondition: false
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Form submitted:', formData);

        try {
            const response = await axios.post('http://localhost:5000/tenders', formData);
            if (response.data.success) {
                alert('Tender submitted successfully!');
                // Optional: Reset form
                setFormData({
                    incoterm: '',
                    pickup: '',
                    destination: '',
                    cargoValue: '',
                    pickupSchedule: '',
                    cargoGoods: '',
                    temperatureRequirement: '15°C - 25°C',
                    weight: '',
                    volume: '',
                    dimension: '',
                    shippersCount: '',
                    palletCount: '',
                    portOfLoading: '',
                    portOfDischarge: '',
                    acceptCondition: false
                });
            } else {
                alert('Failed to submit tender.');
            }
        } catch (error) {
            console.error('Error submitting tender:', error);
            alert('An error occurred while submitting the tender.');
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="text-center mb-6">
                    <h1 className="text-2xl font-medium text-gray-900 mb-1">E-Tender Submission</h1>
                    <p className="text-sm text-gray-500">Complete all fields to submit your shipping tender</p>
                </div>

                {/* Main Form Card */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                    <form onSubmit={handleSubmit} className="p-6 lg:p-8">
                        {/* Section 1: Basic Information */}
                        <div className="mb-8">
                            <div className="flex items-center mb-4">
                                <div className="h-8 w-8 bg-gray-100 rounded-md flex items-center justify-center mr-2.5">
                                    <FileText className="h-4 w-4 text-gray-600" />
                                </div>
                                <h2 className="text-sm font-semibold text-gray-800 uppercase tracking-wide">Basic Information</h2>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <SelectField
                                    icon={Package}
                                    label="Incoterm"
                                    name="incoterm"
                                    value={formData.incoterm}
                                    onChange={handleChange}
                                >
                                    <option value="">Select Incoterm</option>
                                    <option value="EXW">EXW - Ex Works</option>
                                    <option value="FCA">FCA - Free Carrier</option>
                                    <option value="CPT">CPT - Carriage Paid To</option>
                                    <option value="CIP">CIP - Carriage and Insurance Paid To</option>
                                    <option value="DAP">DAP - Delivered at Place</option>
                                    <option value="DPU">DPU - Delivered at Place Unloaded</option>
                                    <option value="DDP">DDP - Delivered Duty Paid</option>
                                    <option value="FOB">FOB - Free on Board</option>
                                    <option value="CFR">CFR - Cost and Freight</option>
                                    <option value="CIF">CIF - Cost, Insurance and Freight</option>
                                </SelectField>

                                <InputField
                                    icon={IndianRupee}
                                    label="Cargo Value"
                                    type="text"
                                    name="cargoValue"
                                    value={formData.cargoValue}
                                    onChange={handleChange}
                                    placeholder="Enter cargo value"
                                />
                            </div>
                        </div>

                        <div className="border-t border-gray-100 my-6"></div>

                        {/* Section 2: Locations */}
                        <div className="mb-8">
                            <div className="flex items-center mb-4">
                                <div className="h-8 w-8 bg-gray-100 rounded-md flex items-center justify-center mr-2.5">
                                    <MapPin className="h-4 w-4 text-gray-600" />
                                </div>
                                <h2 className="text-sm font-semibold text-gray-800 uppercase tracking-wide">Locations & Schedule</h2>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                <InputField
                                    icon={MapPin}
                                    label="Pickup Location"
                                    type="text"
                                    name="pickup"
                                    value={formData.pickup}
                                    onChange={handleChange}
                                    placeholder="Enter pickup address"
                                />

                                <InputField
                                    icon={MapPin}
                                    label="Destination"
                                    type="text"
                                    name="destination"
                                    value={formData.destination}
                                    onChange={handleChange}
                                    placeholder="Enter destination address"
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <InputField
                                    icon={Calendar}
                                    label="Pickup Schedule"
                                    type="datetime-local"
                                    name="pickupSchedule"
                                    value={formData.pickupSchedule}
                                    onChange={handleChange}
                                />

                                <InputField
                                    icon={Truck}
                                    label="Cargo Description"
                                    type="text"
                                    name="cargoGoods"
                                    value={formData.cargoGoods}
                                    onChange={handleChange}
                                    placeholder="Describe the cargo"
                                />
                            </div>
                        </div>

                        <div className="border-t border-gray-100 my-6"></div>

                        {/* Section 3: Cargo Details */}
                        <div className="mb-8">
                            <div className="flex items-center mb-4">
                                <div className="h-8 w-8 bg-gray-100 rounded-md flex items-center justify-center mr-2.5">
                                    <Box className="h-4 w-4 text-gray-600" />
                                </div>
                                <h2 className="text-sm font-semibold text-gray-800 uppercase tracking-wide">Cargo Specifications</h2>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                <InputField
                                    icon={Weight}
                                    label="Weight (kg)"
                                    type="number"
                                    name="weight"
                                    value={formData.weight}
                                    onChange={handleChange}
                                    placeholder="0"
                                />

                                <InputField
                                    icon={Box}
                                    label="Volume (m³)"
                                    type="number"
                                    name="volume"
                                    value={formData.volume}
                                    onChange={handleChange}
                                    placeholder="0"
                                />

                                <InputField
                                    icon={Maximize}
                                    label="Dimensions"
                                    type="text"
                                    name="dimension"
                                    value={formData.dimension}
                                    onChange={handleChange}
                                    placeholder="L×W×H cm"
                                />

                                <InputField
                                    icon={Thermometer}
                                    label="Temperature"
                                    type="text"
                                    name="temperatureRequirement"
                                    value={formData.temperatureRequirement}
                                    onChange={handleChange}
                                    placeholder="15°C - 25°C"
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                                <InputField
                                    label="Number of Shippers"
                                    type="number"
                                    name="shippersCount"
                                    value={formData.shippersCount}
                                    onChange={handleChange}
                                    placeholder="0"
                                />

                                <InputField
                                    label="Number of Pallets"
                                    type="number"
                                    name="palletCount"
                                    value={formData.palletCount}
                                    onChange={handleChange}
                                    placeholder="0"
                                />
                            </div>
                        </div>

                        <div className="border-t border-gray-100 my-6"></div>

                        {/* Section 4: Ports */}
                        <div className="mb-8">
                            <div className="flex items-center mb-4">
                                <div className="h-8 w-8 bg-gray-100 rounded-md flex items-center justify-center mr-2.5">
                                    <Anchor className="h-4 w-4 text-gray-600" />
                                </div>
                                <h2 className="text-sm font-semibold text-gray-800 uppercase tracking-wide">Port Information</h2>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <InputField
                                    icon={Anchor}
                                    label="Port of Loading"
                                    type="text"
                                    name="portOfLoading"
                                    value={formData.portOfLoading}
                                    onChange={handleChange}
                                    placeholder="Enter port name"
                                />

                                <InputField
                                    icon={Anchor}
                                    label="Port of Discharge"
                                    type="text"
                                    name="portOfDischarge"
                                    value={formData.portOfDischarge}
                                    onChange={handleChange}
                                    placeholder="Enter port name"
                                />
                            </div>
                        </div>

                        {/* Temperature Condition */}
                        <div className="mb-6">
                            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                                <div className="flex items-start">
                                    <AlertCircle className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
                                    <div className="ml-3 flex-1">
                                        <h3 className="text-sm font-medium text-amber-900 mb-1">Temperature Control Requirement</h3>
                                        <p className="text-xs text-amber-700 mb-3">
                                            The consignment must be maintained under temperature controlled conditions between
                                            15°C to 25°C, from pickup through to delivery.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-col sm:flex-row gap-3 justify-end pt-4">
                            {/* <button
                type="button"
                className="px-6 py-2 border border-gray-300 text-sm text-gray-700 rounded-md font-medium hover:bg-gray-50 transition-all duration-200"
              >
                Save Draft
              </button> */}
                            <button
                                type="submit"
                                className="px-6 py-2 bg-gray-800 text-white text-sm rounded-md font-medium hover:bg-gray-700 transition-all duration-200"
                            >
                                Submit Tender
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ETenderForm;