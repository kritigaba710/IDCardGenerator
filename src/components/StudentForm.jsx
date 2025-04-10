import React, { useState } from 'react';

const StudentForm = ({ onSubmit }) => {
    const [formData, setFormData] = useState({
        name: '',
        rollNumber: '',
        classDivision: '',
        allergies: [],
        photo: null,
        rackNumber: '',
        busRoute: '',
        photoPreview: '',
    });

    const classOptions = ['10-A', '10-B', '11-A', '11-B'];
    const busRoutes = ['Route 1', 'Route 2', 'Route 3'];
    const allergyOptions = ['Peanuts', 'Dairy', 'Gluten', 'Pollen'];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleAllergyChange = (e) => {
        const value = e.target.value;
        setFormData((prev) => {
            const current = new Set(prev.allergies);
            if (current.has(value)) {
                current.delete(value);
            } else {
                current.add(value);
            }
            return { ...prev, allergies: Array.from(current) };
        });
    };

    const handlePhotoUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData((prev) => ({
                    ...prev,
                    photo: file,
                    photoPreview: reader.result,
                }));
            };
            reader.readAsDataURL(file);
        }
    };



    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.name || !formData.rollNumber || !formData.classDivision) {
            alert("Please fill all required fields.");
            return;
        }
        onSubmit(formData);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4 md:m-20 p-4 md:p-10 bg-gray-800 text-slate-200 rounded-xl shadow-md">
            <div>
                <label className="block font-semibold ">Name:</label>
                <input type="text" name="name" className="input bg-gray-800" value={formData.name} onChange={handleChange} />
            </div>

            <div>
                <label className="block font-semibold">Roll Number:</label>
                <input type="text" name="rollNumber" className="input bg-gray-800" value={formData.rollNumber} onChange={handleChange} />
            </div>

            <div>
                <label className="block font-semibold">Class & Division:</label>
                <select name="classDivision" className="input bg-gray-800" value={formData.classDivision} onChange={handleChange}>
                    <option value="">Select Class</option>
                    {classOptions.map((opt) => (
                        <option key={opt} value={opt}>{opt}</option>
                    ))}
                </select>
            </div>

            <div>
                <label className="block font-semibold">Allergies:</label>
                <div className="flex flex-wrap gap-2">
                    {allergyOptions.map((allergy) => (
                        <label key={allergy} className="flex items-center gap-1">
                            <input
                                type="checkbox"
                                value={allergy}
                                checked={formData.allergies.includes(allergy)}
                                onChange={handleAllergyChange}
                                className='accent-bg-gray-700'
                            />
                            {allergy}
                        </label>
                    ))}
                </div>
            </div>

            


            <div>
                <label className="block font-semibold">Rack Number:</label>
                <input type="text" name="rackNumber" className="input bg-gray-800" value={formData.rackNumber} onChange={handleChange} />
            </div>

            <div>
                <label className="block font-semibold">Bus Route:</label>
                <select name="busRoute" className="input bg-gray-800" value={formData.busRoute} onChange={handleChange}>
                    <option value="">Select Route</option>
                    {busRoutes.map((route) => (
                        <option key={route} value={route}>{route}</option>
                    ))}
                </select>
            </div>
            <div className="flex items-center gap-3">
                <input
                    id="photo-upload"
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoUpload}
                    className="hidden"
                />

                <label
                    htmlFor="photo-upload"
                    className="cursor-pointer bg-slate-700 text-white px-4 py-2 rounded shadow hover:opacity-90 transition"
                >
                    Upload Photo ✨
                </label>

                {formData.photoPreview && (
                    <img
                        src={formData.photoPreview}
                        alt="Preview"
                        className="h-16 w-16 object-cover rounded shadow"
                    />
                )}
            </div>
            <div className='text-center'>
                <button type="submit" class="text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Generate ID</button></div>
        </form>
    );
};

export default StudentForm;
