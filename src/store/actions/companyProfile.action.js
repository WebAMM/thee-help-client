import axios from "axios";
import {
  ADD_COMPANY_PROFILE,
  GET_ALL_COMPANY_PROFILES,
  UPDATE_COMPANY_STATUS,
  UPDATE_COMPANY_PROFILE_BY_ID,
  GET_COMPANY_PROFILE_BY_ID,
  DELETE_COMPANY_PROFILE_BY_ID,
  GET_COMPANY_PROFILE_BY_SLUG,
} from "../../utils/config";

const addCompanyProfileByUserId = async (company) => {
  const { company_name, image, bio, slug, user_id } = company;
  console.log("addCompanyProfileByUserId", company);
  const data = await axios.post(ADD_COMPANY_PROFILE, {
    company_name,
    image,
    bio,
    slug,
    user_id,
  });
  console.log("addNewCopmanyProfile", data);
  return data;
};

const getAllCompanies = async () => {
  const data = await axios.get(GET_ALL_COMPANY_PROFILES);
  console.log(data);
  return data;
};

const updateCompanyStatusById = async (company) => {
  const { is_active, company_id } = company;
  const data = await axios.put(`${UPDATE_COMPANY_STATUS}/${company_id}`, {
    is_active,
  });
  console.log("updateCompanyStatus", data);
  return data;
};

const updateCompanyProfileById = async (company) => {
  const { company_name, image, bio, slug, user_id, company_id } = company;
  const data = await axios.put(
    `${UPDATE_COMPANY_PROFILE_BY_ID}/${company_id}`,
    {
      company_name,
      image,
      bio,
      slug,
      user_id,
    }
  );
  console.log("updateCompanyProfile", data);
  return data;
};

const getCompanyProfileById = async (company_id) => {
  const data = await axios.get(`${GET_COMPANY_PROFILE_BY_ID}${company_id}`);
  console.log("getCompanyProfileById", data);
  return data;
};

const deleteCompanyProfileById = async (company_id) => {
  const data = await axios.delete(
    `${DELETE_COMPANY_PROFILE_BY_ID}${company_id}`
  );
  console.log("deleteCompanyProfileById", data);
  return data;
};

const getCompanyProfileBySlug = async (slug) => {
  const data = await axios.get(`${GET_COMPANY_PROFILE_BY_SLUG}${slug}`);
  console.log("getCompanyProfileById", data);
  return data;
};

const CompanyProfile = {
  getCompanyProfileBySlug,
  addCompanyProfileByUserId,
  getAllCompanies,
  updateCompanyStatusById,
  updateCompanyProfileById,
  getCompanyProfileById,
  deleteCompanyProfileById,
};

export default CompanyProfile;
