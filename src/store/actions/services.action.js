import axios from "axios";
import {
  GET_SERVICE_LIST,
  ADD_SERVICE,
  GET_SERVICE_BY_ID,
  GET_SERVICE_BY_USERID,
  DELETE_SERVICE,
} from "../../utils/config";

const GetAllServices = async () => {
  const data = await axios.get(GET_SERVICE_LIST);
  return data;
};

const GetUserServices = async (userId) => {
  console.log("URL:", `${GET_SERVICE_BY_USERID}/${userId}`);
  const data = await axios.get(`${GET_SERVICE_BY_USERID}/${userId}`);
  return data;
};

const AddService = async (service) => {
  const {
    name,
    image,
    description,
    amount,
    start_time,
    end_time,
    service_date,
    user_id,
  } = service;
  const base64Image = btoa(image);
  // console.log("service", service, "base64Image", base64Image);
  const data = await axios.post(ADD_SERVICE, {
    name,
    image:
      "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAAAXNSR0IArs4c6QAAA8BJREFUWEflmUsobVEYx/9HhBShkJgJE5RnXgmJvPKcGSrJDAOPRIk8wkAMEEWUIUImylRH5JEIpRwiKWTgldv33fa2HeexX65dd032OXuv/f9+63ustc46JrPZ/OHn5wd3d3cYqT0/P+Pu7g6ms7OzD/oQFhYGHx8fQzDe39/j5OQE5DiTxWL58PLy4htGgBTgiOXp6ekvYHBwMKQPfsuT1gyXl5efgBTb34S0Zfsb4G9B2nOMTcB/DekoanYB/xWks5RyCPjTkM7gyL5TwJ+ClAMnG1BvSLlwigD1glQCpxhQK6RSOFWAaiHVwKkGVAqpFk4ToFxILXCaAZ1BaoXTBdAepB5wugFaQ9J3vfaWslYSuVtswWvUX6+N7/8DKM05w4XYVkEYpkgcgegBqSkH5QDI6eOoCFUDKjGspK81rCpANQbVvKNqolZryNmyaC/MijyoBU4AUKrhEHBgYACNjY24urqCp6cnL19msxm9vb24vb1FZGQkxsfHERMTI3exgaC5traGpKQkPguamZlBe3u7TU27gEdHRygtLQVdDw8P8fj4iJeXF+Tn52N1dRWJiYkYGRnB4OAgjo+P4ebm5hRSjaZNwPf3d6SlpaGtrQ3FxcVYWVnh0fb19eH6+hoTExMiTEhICGZnZxlyeHgYW1tbDDs1NcX9t7e34eHhAWvNi4sLjkp9fT1eX18xPT39TTMjI8P2z86enh42ODQ0xMdf5MHw8HCUlZUhNTUVDQ0Nolh2djYqKipQW1uLgoICpKeno7q6GlFRUVhaWkJ8fDz3FTQnJyfh6uoKAgwKCkJRURFvLDo6OsSjP6nmNw8eHBygpKQE6+vruLm5Yc8JYrm5uezRuro6EZAM0EiFXKXQExxdySg1QZPyl3JOCkiaOTk5yMzMFHdAUs0vgG9vb0hJSUFLSwtCQ0P5BX9/fxGwvLwccXFx/Fxo5LGqqirU1NTwLYIfGxuDxWJBQEAABM2uri4GoSYFFDTpPWEPWVhYKGp+AdzZ2eGRUG6QiIuLC87Pz0F5Njo6is3NTZyenmJubo4NUV4FBgZiYWGBQ7+3t8dFRAYeHh44N0kzKysL3t7e4qDsadIURKmVl5eHxcVF1vwCaGuOko6WcpFCvry8jOTkZPT39/MUsb+/z7AJCQloamriFImOjkZ3dzfnp3VzpNnZ2cmaVGy+vr6fgPaOgKViZGh+fh7Nzc1czbGxsVzRERERaG1tZQ/SyKltbGygsrISu7u7XAzS5kyTitNkMnGK8RGw4Q/Rjf43xB++/MjGN7EexgAAAABJRU5ErkJggg==",
    description,
    amount,
    start_time,
    end_time,
    service_date,
    user_id,
  });
  console.log("data", data);
  return data;
};

export const getServiceById = async (id) => {
  const data = await axios.get(`${GET_SERVICE_BY_ID}${id}`);
  return data;
};

export const deleteServiceById = async (id) => {
  const data = await axios.delete(`${DELETE_SERVICE}${id}`);
  return data;
};

const Services = {
  GetAllServices,
  GetUserServices,
  AddService,
  deleteServiceById,
  getServiceById,
};

export default Services;
