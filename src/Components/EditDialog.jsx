import React, { useState } from "react";
import UserRequests from "../Requests/UserRequests";
import axios from "axios";
import { UserAction } from "../Redux/Actions/Actions";
import close from "../icons/close.png";
import "../style/editDialog.css";
import { useDispatch, useSelector } from "react-redux";
import { EditInfoToggleBtnAction } from "../Redux/Actions/Actions";
const EditDialog = () => {
  const dispatch = useDispatch();
  const editInfo = useSelector((state) => state?.Toggle?.EditInfo);
  const user = useSelector((state) => state?.User?.user);
  const [mobile, setMobile] = useState(user?.phoneNumber);
  const MobileChange = (e) => {
    e.preventDefault();
    axios
      .patch(UserRequests.GET_USER + user?._id, {
        phoneNumber: mobile,
      })
      .then((res) => {
        console.log(res);
        dispatch(UserAction({ ...user, phoneNumber: mobile }));
        dispatch(EditInfoToggleBtnAction(null));
      })
      .catch((err) => {
        console.log("error occured");
      });
  };
  return (
    <>
      <section className={editInfo ? "edit_dialog" : "hide edit_dialog"}>
        <img
          onClick={() => dispatch(EditInfoToggleBtnAction(null))}
          className="close_editInfo"
          src={close}
          alt=""
        />
        {editInfo == "phoneChange" && (
          <section className="edit_num">
            
            <form>
            <strong>Change your Mobile Number</strong>
              <label htmlFor="phoneNum">Enter your mobile number</label>
              <input
                onChange={(e) => setMobile(e.target.value)}
                value={mobile}
                type="number"
                placeholder="XXXX-XXXX-XX"
              />
              <button className="checkoutBtn" onClick={(e) => MobileChange(e)}>Done</button>
            </form>
          </section>
        )}
        {editInfo == "address" && (
          <section className="edit_address">
            <form>
              <strong>Change your Address</strong>
              <label htmlFor="college">Select Your College</label>
              <select name="" id="college">
                <option value="marwadi">Marwadi University</option>
                <option value="marwadi">Dharshan University</option>
              </select>
              <label htmlFor="college">Select Your Hostel</label>
              <select name="Hostel" id="college">
                <option value="Hostel A">A Wing</option>
                <option value="Hostel A">B Wing</option>
                <option value="Hostel A">C Wing</option>
                <option value="Hostel A">D Wing</option>
              </select>
              <label htmlFor="room_no">Enter your room number</label>
              <input type="number" placeholder="0000" />
              <button className="checkoutBtnMobile checkoutBtn">Done</button>
            </form>
          </section>
        )}
      </section>
    </>
  );
};

export default EditDialog;
