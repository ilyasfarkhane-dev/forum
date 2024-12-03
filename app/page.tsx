"use client";

import { useState } from "react";
import axios from "axios";

export default function Home() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    faculty: "",
    externalInstitution: "",
    educationLevel: "",
    customEducationLevel: "",
    isGraduate: "",
    interviews: "",
    objectives: "",
    remarks: "",
  });
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); 

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
      ...(name === "educationLevel" && value !== "Autre" && { customEducationLevel: "" }), // Reset customEducationLevel if not "Autre"
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMessage("");
    setErrorMessage("");
    try {
      const response = await axios.post(
        " https://forum-back-8cvh.onrender.com/submit", // Replace with your actual endpoint
        formData
      );
      setLoading(false);
      setSuccessMessage("Le formulaire a été envoyé avec succès !");
    } catch (error) {
      console.error("Erreur lors de l'enregistrement des données :", error);
      setErrorMessage("Merçi de Vérifie les champs manquants !!");
      setLoading(false);
    }
  };

  return (
    
    <div className="min-h-screen bg-gray-50 p-4">
    {/* Section des logos */}
    <div className="flex items-center rounded-lg mb-8 justify-center">
      <img src="fs.png" alt="Logo FSBM" className="h-[120px] ml-12" />
      <img src="so.png" alt="Logo Soft Skills" className="h-[160px] ml-12" />
      <img src="ai.png" alt="Logo AI & DEV" className="h-[160px] ml-12" />
      <img src="fo.png" alt="Logo Forum Entreprise" className="h-[160px] ml-12" />
    </div>
  
    {successMessage ? (
      <div className=" p-32 rounded-lg  text-center">
      {/* Ajout de l'image au-dessus du titre */}
      <img 
        src="success.png"  // Remplacez par le chemin réel de votre image
        alt="Success Icon"
        className="mx-auto mb-4 w-16 h-16"  // Ajustez la taille de l'image
      />
      <h1 className="text-2xl font-semibold text-green-600">
        {successMessage}
      </h1>
    </div>
    ) : (
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-2xl mx-auto">
        <h1 className="text-2xl font-semibold text-center text-gray-800 mb-6">
          Formulaire de Vérification de Présence et d'Informations Étudiantes
        </h1>
        <form onSubmit={handleSubmit} className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg space-y-6">
        <h1 className="text-2xl font-bold text-gray-800 text-center mb-4">
    Formulaire d'Inscription
  </h1>

  {/* General Information Section */}
  <div className="space-y-4">
    <h2 className="text-xl font-semibold text-gray-700 border-b pb-2">Informations Générales</h2>

    <div>
      <label className="block text-gray-600 font-medium mb-2">Nom et Prénom :</label>
      <input
        type="text"
        name="name"
        placeholder="Entrez votre nom complet"
        value={formData.name}
        onChange={handleChange}
        className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      />
    </div>

    <div>
      <label className="block text-gray-600 font-medium mb-2">Email :</label>
      <input
        type="email"
        name="email"
        placeholder="Entrez votre email"
        value={formData.email}
        onChange={handleChange}
        className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      />
    </div>

    <div>
      <label className="block text-gray-600 font-medium mb-2">Numéro de Téléphone :</label>
      <input
        type="text"
        name="phone"
        placeholder="Entrez votre numéro"
        value={formData.phone}
        onChange={handleChange}
        className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      />
    </div>
  </div>

  {/* Academic Information Section */}
  <div className="space-y-4">
    <h2 className="text-xl font-semibold text-gray-700 border-b pb-2">Informations Académiques</h2>

    <div>
      <label className="block text-gray-600 font-medium mb-2">Faculté d'origine :</label>
      <select
        name="faculty"
        value={formData.faculty}
        onChange={handleChange}
        className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      >
        <option value="">-- Sélectionnez une option --</option>
        <option value="Faculté des Sciences Ben M'Sick">Faculté des Sciences Ben M'Sick</option>
        <option value="Externe">Externe</option>
      </select>
    </div>

    {formData.faculty === "Externe" && (
      <div>
        <label className="block text-gray-600 font-medium mb-2">Nom de l’établissement :</label>
        <input
          type="text"
          name="externalInstitution"
          placeholder="Entrez le nom de l’établissement"
          value={formData.externalInstitution}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
    )}

    <div>
      <label className="block text-gray-600 font-medium mb-2">Niveau d’études :</label>
      <select
        name="educationLevel"
        value={formData.educationLevel}
        onChange={handleChange}
        className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      >
        <option value="">-- Sélectionnez une option --</option>
        <option value="Licence">Licence</option>
        <option value="Master 1ère année">Master 1ère année</option>
        <option value="Master 2ème année">Master 2ème année</option>
        <option value="Doctorat">Doctorat</option>
        <option value="Autre">Autre</option>
      </select>
    </div>

    {formData.educationLevel === "Autre" && (
      <div>
        <input
          type="text"
          name="customEducationLevel"
          placeholder="Précisez votre niveau d'études"
          value={formData.customEducationLevel}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
    )}
  </div>

  {/* Objectives Section */}
  <div className="space-y-4">
    <h2 className="text-xl font-semibold text-gray-700 border-b pb-2">Statut et Objectifs</h2>

    <div>
      <label className="block text-gray-600 font-medium mb-2">Êtes-vous lauréat(e) ?</label>
      <div className="flex items-center gap-4">
        <label className="flex items-center">
          <input
            type="radio"
            name="isGraduate"
            value="Oui"
            checked={formData.isGraduate === "Oui"}
            onChange={handleChange}
            className="mr-2"
          />
          Oui
        </label>
        <label className="flex items-center">
          <input
            type="radio"
            name="isGraduate"
            value="Non"
            checked={formData.isGraduate === "Non"}
            onChange={handleChange}
            className="mr-2"
          />
          Non
        </label>
      </div>
    </div>

    {formData.isGraduate === "Non" && (
      <div>
        <label className="block text-gray-600 font-medium mb-2">
          À quelles entreprises avez-vous déjà passé un entretien ?
        </label>
        <textarea
          name="interviews"
          placeholder="Ajoutez vos expériences d’entretien ici"
          value={formData.interviews}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
    )}

    <div>
      <label className="block text-gray-600 font-medium mb-2">Quels sont vos objectifs ?</label>
      <select
        name="objectives"
        value={formData.objectives}
        onChange={handleChange}
        className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      >
        <option value="">-- Sélectionnez une option --</option>
        <option value="Rechercher un CDI">Rechercher un CDI</option>
        <option value="Rechercher un stage PFE">Rechercher un stage PFE</option>
        <option value="PFA">PFA</option>
        <option value="Stage d’été">Stage d’été</option>
      </select>
    </div>
  </div>

  {/* Remarks Section */}
  <div>
    <label className="block text-gray-600 font-medium mb-2">
      Avez-vous des remarques ou commentaires supplémentaires ?
    </label>
    <textarea
      name="remarks"
      placeholder="Ajoutez vos remarques ici"
      value={formData.remarks}
      onChange={handleChange}
      className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
    />
  </div>

          <button
            type="submit"
            className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-300 shadow-md"
          >
            {loading ? "En cours..." : "Soumettre"}
          </button>
          {errorMessage && <p className="text-red-600 mt-4 text-center">{errorMessage}</p>}
        </form>
      </div>
    )}
  </div>
  
  );
}
