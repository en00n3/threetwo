import React, { ReactElement, useCallback, useContext, useEffect, useState } from "react";
import { getTransfers } from "../../actions/airdcpp.actions";
import { useDispatch, useSelector } from "react-redux";
import { AirDCPPSocketContext } from "../../context/AirDCPPSocket";
import { isEmpty, isNil, isUndefined } from "lodash";
import { searchIssue } from "../../actions/fileops.actions";
import { determineCoverFile } from "../../shared/utils/metadata.utils";
import MetadataPanel from "../shared/MetadataPanel";

interface IDownloadsProps {
  data: any;
}

export const Downloads = (props: IDownloadsProps): ReactElement => {
  const airDCPPConfiguration = useContext(AirDCPPSocketContext);
  const {
    airDCPPState: { settings, socket },
  } = airDCPPConfiguration;
  const dispatch = useDispatch();

  const airDCPPTransfers = useSelector(
    (state: RootState) => state.airdcpp.transfers,
  );
  const issueBundles = useSelector((state: RootState) => state.airdcpp.issue_bundles);
  const [bundles, setBundles] = useState([]);
  // Make the call to get all transfers from AirDC++
  useEffect(() => {
    if (!isUndefined(socket) && !isEmpty(settings)) {
      dispatch(
        getTransfers(socket, {
          username: `${settings.directConnect.client.host.username}`,
          password: `${settings.directConnect.client.host.password}`,
        }),
      );
    }
  }, [socket]);

  useEffect(() => {
    if (!isUndefined(issueBundles)) {
      const foo = issueBundles.data.map((bundle) => {
        const { rawFileDetails, inferredMetadata, acquisition: { directconnect: { downloads } }, sourcedMetadata: { locg, comicvine } } = bundle;
        const { issueName, url } = determineCoverFile({
          rawFileDetails, comicvine, locg,
        });
        return { ...bundle, issueName, url }

      })
      setBundles(foo);
    }

  }, [issueBundles])

  return !isNil(bundles) ?
    <div className="container">
      <section className="section">
        <h1 className="title">Downloads</h1>
        <div className="columns">
          <div className="column is-half">
            {bundles.map(bundle => {
              console.log(bundle);
              return <>
                <MetadataPanel
                  data={bundle}
                  imageStyle={{ maxWidth: 80 }}
                  titleStyle={{ fontSize: "0.8rem" }}
                  tagsStyle={{ fontSize: "0.7rem" }}
                  containerStyle={{
                    maxWidth: 400,
                    padding: 0,
                    margin: "0 0 8px 0",
                  }} />

                  <table className="table is-size-7">
                    <tr>
                      <th>Name</th>
                      <th>Size</th>
                      <th>Type</th>
                      <th>Bundle ID</th>
                    </tr>

                    {bundle.acquisition.directconnect.downloads.map((bundle) => {
                      return(<tr>
                        <td>{bundle.name}</td>
                        <td>{bundle.size}</td>
                        <td>{bundle.type.str}</td>
                        <td>{bundle.bundleId}</td>
                      </tr>)
                    })}
                  </table>
                {/* <pre>{JSON.stringify(bundle.acquisition.directconnect.downloads, null, 2)}</pre> */}
              </>
            })}
          </div>
        </div>
      </section>
    </div> : <div>asd</div>;
};

export default Downloads;
