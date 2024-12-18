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
      ...(name === "educationLevel" && value !== "Autre" && { customEducationLevel: "" }),
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMessage("");
    setErrorMessage("");
    try {
      const response = await axios.post(
        "https://forum-back-8cvh.onrender.com/submit", 
        formData
      );
      setLoading(false);
      setSuccessMessage("Le formulaire a été envoyé avec succès !");
    } catch (error) {
      console.error("Erreur lors de l'enregistrement des données :", error);
      setErrorMessage("Merci de vérifier les champs manquants !");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      {/* Logos Section */}
      <div className="flex flex-wrap items-center justify-center gap-6 mb-8">
        <img src="fs.png" alt="Logo FSBM" className="h-[80px] sm:h-[120px]" />
        <img src="so.png" alt="Logo Soft Skills" className="h-[100px] sm:h-[160px]" />
        <img src="ai.png" alt="Logo AI & DEV" className="h-[100px] sm:h-[160px]" />
        <img src="fo.png" alt="Logo Forum Entreprise" className="h-[100px] sm:h-[160px]" />
      </div>

      {successMessage ? (
        <div className="flex flex-col items-center p-24">
          <img
            src="success.png"
            alt="Success Icon"
            className="mb-4 w-16 h-16"
          />
          <h1 className="text-xl sm:text-2xl font-semibold text-green-600 text-center">
            {successMessage}
          </h1>
        </div>
      ) : (
        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-3xl mx-auto">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-800 text-center mb-6">
            Formulaire de Vérification de Présence et d'Informations Étudiantes
          </h1>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* General Information */}
            <div className="space-y-4">
              <h2 className="text-lg sm:text-xl font-semibold text-gray-700 border-b pb-2">
                Informations Générales
              </h2>
              <div>
                <label className="block text-gray-600 font-medium mb-2">Nom et Prénom :</label>
                <input
                  type="text"
                  name="name"
                  placeholder="Entrez votre nom complet"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                  className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                  className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Academic Information */}
            <div className="space-y-4">
              <h2 className="text-lg sm:text-xl font-semibold text-gray-700 border-b pb-2">
                Informations Académiques
              </h2>
              <div>
                <label className="block text-gray-600 font-medium mb-2">Faculté d'origine :</label>
                <select
                  name="faculty"
                  value={formData.faculty}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">-- Sélectionnez une option --</option>
                  <option value="Faculté des Sciences Ben M'Sick">Faculté des Sciences Ben M'Sick</option>
                  <option value="Externe">Externe</option>
                </select>
              </div>
              {formData.faculty === "Externe" && (
                <div>
                  <label className="block text-gray-600 font-medium mb-2">
                    Nom de l’établissement :
                  </label>
                  <input
                    type="text"
                    name="externalInstitution"
                    placeholder="Entrez le nom de l’établissement"
                    value={formData.externalInstitution}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              )}
              <div>
                <label className="block text-gray-600 font-medium mb-2">Niveau d’études :</label>
                <select
                  name="educationLevel"
                  value={formData.educationLevel}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                    className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              )}
            </div>

            {/* Objectives */}
            <div className="space-y-4">
              <h2 className="text-lg sm:text-xl font-semibold text-gray-700 border-b pb-2">
                Statut et Objectifs
              </h2>
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
                    className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              )}
              <div>
                <label className="block text-gray-600 font-medium mb-2">
                  Quels sont vos objectifs principaux ?
                </label>
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

            {/* Additional Comments */}
            <div>
              <label className="block text-gray-600 font-medium mb-2">Remarques ou suggestions :</label>
              <textarea
                name="remarks"
                placeholder="Ajoutez vos remarques ici"
                value={formData.remarks}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className={`w-full p-3 text-white font-medium rounded-lg shadow-lg ${
                loading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
              } focus:outline-none focus:ring-2 focus:ring-blue-500`}
              disabled={loading}
            >
              {loading ? "Envoi..." : "Soumettre"}
            </button>
          </form>
          {errorMessage && (
            <p className="text-red-600 text-sm font-medium mt-4">{errorMessage}</p>
          )}
        </div>
      )}
    </div>
  );
}
