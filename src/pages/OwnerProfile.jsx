/* eslint-disable react/prop-types */
import AdminSidebar from "../components/AdminSidebar";
import Bar from "../components/Bar";
import { Filter } from "./InvoiceDetails";
import { useEffect, useState } from "react";
import Select, { components } from "react-select";
import { CUSTOME_STYLES } from "../assets/data/constants";

import { customerHeaders, customerData, ownerSortOptions } from "../assets/data/owner";
import { TableBody, Table, TableContainer, TableHeaders, TableHeading, OwnerRow } from "../components/TableHOC";
import { FaSort } from "react-icons/fa";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { getOwners } from "../redux/actions";

//  ?--- dropdown indicator

const DropdownIndicator = (props) => {
	return (
		<components.DropdownIndicator {...props}>
			<FaSort />
		</components.DropdownIndicator>
	);
};

function OwnerProfile() {
	const [sortedData, setSortedData] = useState([]);
	const { owners } = useSelector((state) => state.owner);
	const dispatch = useDispatch();

	useEffect(() => {
		if (owners) {
			// console.log(owners);

			const ownerList = owners.map((owner, idx) => {
				let status = "unpaid";
				let allPaid = true;

				const someUnpaid = owner.invoices.some((invoice) => invoice.status === "unpaid");
				if (someUnpaid) {
					allPaid = false;
				}

				if (allPaid) {
					status = "paid";
				}

				return {
					data: [idx, owner?.name, `${owner?.cars?.length} cars`, owner?.address?.city],
					status,
					_id: owner._id,
				};
			});

			setSortedData(ownerList);
		}
	}, [owners]);

	useEffect(() => {
		dispatch(getOwners());
	}, []);

	// ? handle sorting functionalities
	const handleSortChange = (selectedOption) => {
		let sortedDataCopy = [...customerData];
		if (selectedOption.value === "kilometers") {
			sortedDataCopy.sort((a, b) => {
				const kilometersA = parseInt(a.data[2].replace(/ km/g, ""));
				const kilometersB = parseInt(b.data[2].replace(/ km/g, ""));
				return kilometersA - kilometersB;
			});
		} else if (selectedOption.value === "amount") {
			sortedDataCopy.sort((a, b) => a.data[5] - b.data[5]);
		} else if (selectedOption.value === "days") {
			sortedDataCopy.sort((a, b) => parseInt(a.data[4].replace(" days", "")) - parseInt(b.data[4].replace(" days", "")));
		} else if (selectedOption.value === "rate") {
			sortedDataCopy.sort((a, b) => {
				const rateA = parseFloat(a.data[3].replace("/day", ""));
				const rateB = parseFloat(b.data[3].replace("/day", ""));
				return rateA - rateB;
			});
		}
		setSortedData(sortedDataCopy);
	};

	const searchOwner = (e, query) => {
		e.preventDefault();
		const filteredData = customerData.filter((item) => {
			// Adjust this condition based on your data structure
			// Here assumed item.data[1] contains the field to search
			const searchData = item.data.map((value) => value.toLowerCase());
			return searchData.some((value) => value.includes(query.toLowerCase()));
		});
		console.log(filteredData);
		if (filteredData.length === 0) {
			toast.error("Data Not Found");
		}
		setSortedData(() => filteredData);
	};

	return (
		<div className="admin-container">
			<AdminSidebar />
			<main className="ownerProfile">
				<Bar />
				<h2>Owner Profile</h2>
				<Filter isOwnerProfile={true} onClickSearchHandler={searchOwner} />
				<TableContainer>
					<TableHeading>
						<p>Owner Profile</p>
						<Select
							defaultValue={ownerSortOptions[0]}
							options={ownerSortOptions}
							components={{ DropdownIndicator }}
							onChange={handleSortChange}
							styles={CUSTOME_STYLES}
						/>
					</TableHeading>
					<Table>
						<TableHeaders style={{ gridTemplateColumns: `repeat(${customerHeaders.length},1fr)` }} headers={customerHeaders} />
						<TableBody TableRow={OwnerRow} data={sortedData} />
					</Table>
				</TableContainer>
			</main>
		</div>
	);
}

export default OwnerProfile;
