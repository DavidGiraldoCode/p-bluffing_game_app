import DesignSystemView from "../views/DesignSystemView";

export default function DesignSystemPresenter(props) {
    return <div class="Presenter container">
        <DesignSystemView onDesignSystem={x => console.log("Hello on Presenter")}/>
    </div>
}