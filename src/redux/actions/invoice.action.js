import axios from "axios";
import Cookies from "js-cookie";

// const URI = "http://localhost:8000";
// const URI = "https://unusual-jade-puppy.cyclic.app";

export const generateInvoice = (invoice) => async (dispatch) => {
	try {
		dispatch({
			type: "GENERATE_SINGLE_INVOICE_REQUEST",
		});

		const token = Cookies.get("token"); // Get the token from the cookie

		const config = {
			headers: {
				Authorization: `Bearer ${token}`, // Include the token in the Authorization header
			},
		};

		// eslint-disable-next-line no-unused-vars
		const { data } = await axios.post(`http://localhost:8000/api/v1/admin/generate/invoice`, invoice, config);

		const payload = {
			message: data.message,
		};

		dispatch({
			type: "GENERATE_SINGLE_INVOICE_SUCCESS",
			payload,
		});
	} catch (error) {
		console.log(error);
		dispatch({
			type: "GENERATE_SINGLE_INVOICE_FAILURE",
			payload: error.response.data.message,
		});
	}
};

export const getAllInvoices = (invoice) => async (dispatch) => {
	try {
		dispatch({
			type: "GET_ALL_INVOICES_REQUEST",
		});

		const token = Cookies.get("token"); // Get the token from the cookie

		const config = {
			headers: {
				Authorization: `Bearer ${token}`, // Include the token in the Authorization header
			},
		};

		// eslint-disable-next-line no-unused-vars
		const { data } = await axios.get(`http://localhost:8000/api/v1/admin/get/invoices`, invoice, config);

		const payload = {
			message: data.message,
			invoices: data.data,
		};

		dispatch({
			type: "GET_ALL_INVOICES_SUCCESS",
			payload,
		});
	} catch (error) {
		console.log(error);
		dispatch({
			type: "GET_ALL_INVOICES_FAILURE",
			payload: error.response.data.message,
		});
	}
};

export const getIndividualInvoices = () => async (dispatch) => {
	try {
		dispatch({
			type: "GET_INDIVIDUAL_INVOICES_REQUEST",
		});

		const token = Cookies.get("token"); // Get the token from the cookie

		const config = {
			headers: {
				Authorization: `Bearer ${token}`, // Include the token in the Authorization header
			},
		};

		// eslint-disable-next-line no-unused-vars
		const { data } = await axios.get(`http://localhost:8000/api/v1/admin/get/individual/invoices`, config);

		const payload = data.data;

		dispatch({
			type: "GET_INDIVIDUAL_INVOICES_SUCCESS",
			payload,
		});
	} catch (error) {
		console.log(error);
		dispatch({
			type: "GET_INDIVIDUAL_INVOICES_FAILURE",
			payload: error.response.data.message,
		});
	}
};

export const getSingleInvoice = (id) => async (dispatch) => {
	try {
		dispatch({
			type: "GET_SINGLE_INVOICE_REQUEST",
		});

		const token = Cookies.get("token"); // Get the token from the cookie

		const config = {
			headers: {
				Authorization: `Bearer ${token}`, // Include the token in the Authorization header
			},
		};

		// eslint-disable-next-line no-unused-vars
		const { data } = await axios.get(`http://localhost:8000/api/v1/admin/get/invoice?id=${id}`, { id }, config);

		const payload = data.data;

		dispatch({
			type: "GET_SINGLE_INVOICE_SUCCESS",
			payload,
		});
	} catch (error) {
		console.log(error);
		dispatch({
			type: "GET_SINGLE_INVOICE_FAILURE",
			payload: error.response.data.message,
		});
	}
};

export const payInvoice = (id) => async (dispatch) => {
	try {
		dispatch({
			type: "PAY_INVOICE_REQUEST",
		});

		const token = Cookies.get("token"); // Get the token from the cookie

		const config = {
			headers: {
				Authorization: `Bearer ${token}`, // Include the token in the Authorization header
			},
		};

		// eslint-disable-next-line no-unused-vars
		const { data } = await axios.post(`http://localhost:8000/api/v1/admin/pay/invoice?id=${id}`, { id }, config);

		const payload = {
			message: data.message,
			invoice: data.data,
		};

		dispatch({
			type: "PAY_INVOICE_SUCCESS",
			payload,
		});
	} catch (error) {
		console.log(error);
		dispatch({
			type: "PAY_INVOICE_FAILURE",
			payload: error.response.data.message,
		});
	}
};

export const payAllInvoice = (ids) => async (dispatch) => {
	try {
		dispatch({
			type: "PAY__ALL_INVOICE_REQUEST",
		});

		const token = Cookies.get("token"); // Get the token from the cookie

		const config = {
			headers: {
				Authorization: `Bearer ${token}`, // Include the token in the Authorization header
			},
		};

		let dt;

		// eslint-disable-next-line no-unused-vars
		for (const id of ids) {
			dt = await axios.post(`http://localhost:8000/api/v1/admin/pay/invoice?id=${id}`, { id }, config);
		}

		const { data } = dt;

		const payload = {
			message: data.message,
			invoice: data.data,
		};

		dispatch({
			type: "PAY__ALL_INVOICE_SUCCESS",
			payload,
		});
	} catch (error) {
		console.log(error);
		dispatch({
			type: "PAY__ALL_INVOICE_FAILURE",
			payload: error.response.data.message,
		});
	}
};
