import { ref, watch } from "vue";
import axios from "axios";
import { useRoute } from "vue-router";
export default function getListMeal(type) {
  const list = ref([]);
  const isLoading = ref(false);
  const id = ref("beef");
  const route = useRoute();
  watch(route, (newRoute) => {
    id.value = newRoute.params.id;
    getList();
  });
  const getList = async () => {
    isLoading.value = true;
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_APP_API_URL}/filter.php?${type}=${id.value}`
      );
      res ? (list.value = res.data.meals) : (list.value = []);
    } catch (error) {
      console.log(error.message);
    } finally {
      isLoading.value = false;
    }
  };

  return { getList, list };
}
